import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import './Rainfall.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

export const Rainfall = (props) => {
  const [rainfall, setRainfall] = useState([]);
  const token = localStorage.getItem('zapmanejo_token');
  const url = '/api/data/rain';

  const columns = [
    {name:"Amount", selector: row => `${row.amount}mm`, sortable:true},
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
        setRainfall(result);
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
    const graphData = aggregateData(rainfall, "amount");
    const data = {
      labels: graphData.xValues,
      datasets: [{
        label: 'Rainfall',
        data: graphData.yValues,
        backgroundColor: ["#7F0070", "#7F4E00", "#007F0F", "##00317F"],
        borderWidth: 1,
      }],
    };
    return (
      <div className="Rainfall Chart">
        <Pie data={data}/>
      </div>
    );
  }

  return (
    <div className="Rainfall">
      <h2>Rainfall</h2>
      <DataTable
        columns={columns}
        data={rainfall}
      />
    </div>
  );
}
export default Rainfall;
