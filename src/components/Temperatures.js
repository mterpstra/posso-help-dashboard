import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import './Temperatures.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

export const Temperatures = (props) => {
  const [temperatures, setTemperatures] = useState([]);
  const token = localStorage.getItem('zapmanejo_token');
  const url = '/api/data/temperature';

  const columns = [
    {name:"Temperature", selector: row => `${row.temperature} celcius`, sortable:true},
    {name:"Date", selector: row => row.date, sortable:true},
    {name:"Who", selector: row => row.name, sortable:true},
    {name:"From", selector: row => row.phone, sortable:true},
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            "Authorization":`Bearer ${token}`,
            "Content-Type":"application/json"
          }});
        if (!response.ok) {
          // @todo:  Probably need to check the "success" flag.
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setTemperatures(result);
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchData();
  }, []);

  const aggregateData = (rawData, field) => {
    var xValues = [];
    var yValues = [];
    for(let i=0; i < rawData.length; i++) {
      const yearMonth = rawData[i].date.slice(0, 7);
      let index = xValues.indexOf(yearMonth);
      if (index < 0) {
        xValues.push(yearMonth);
        yValues.push(rawData[i][field]);
      } else {
        yValues[index] += rawData[i][field];
      }
    }
    return {xValues:xValues, yValues:yValues}
  }

  if (props.graph) {
    const graphData = aggregateData(temperatures, "temperature");
    const data = {
      labels: graphData.xValues,
      datasets: [{
        label: 'Temperature',
        data: graphData.yValues,
        backgroundColor: ["#7F3500", "#0B7F00", "#004A7F", "#74007F"],
        borderWidth: 1,
      }],
    };
    return (
      <div className="Temperatures Chart">
        <Pie data={data}/>
      </div>
    );
  }

  return (
    <div className="Temperatures">
      <h2>Temperatures</h2>
      <DataTable
        columns={columns}
        data={temperatures}
      />
    </div>
  );
}
export default Temperatures;
