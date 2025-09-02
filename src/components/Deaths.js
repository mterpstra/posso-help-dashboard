import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import './Deaths.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

export const Deaths = (props) => {
  const [deaths, setDeaths] = useState([]);
  const token = localStorage.getItem('zapmanejo_token');
  const url = '/api/data/deaths/16166100305';

  const columns = [
    {name:"Tag", selector: row => row.tag, sortable:true},
    {name:"Cause", selector: row => row.cause, sortable:true},
    {name:"Sex", selector: row => row.sex, sortable:true},
    {name:"Area", selector: row => row.area, sortable:true},
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
        setDeaths(result);
      } catch (err) {
        console.log("error", err);
      } 
    };
    fetchData();
  }, []);


  // Aggregate data by cause of death.
  const aggregateData = (rawData) => {
    var xValues = [];
    var yValues = [];
    for(let i=0; i < rawData.length; i++) {
      let index = xValues.indexOf(rawData[i].cause);
      if (index < 0) {
        xValues.push(rawData[i].cause);
        yValues.push(1);
      } else {
        yValues[index]++;
      }
    }
    return {xValues:xValues, yValues:yValues}
  }


  if (props.graph) {
    const graphData = aggregateData(deaths);
    const data = {
      labels: graphData.xValues,
      datasets: [{
        label: 'Deaths by Cause',
        data: graphData.yValues,
        backgroundColor: ["#37007F", "#7F0008", "#487F00", "#007F77"],
        borderWidth: 1,
      }],
    };
    return (
      <div className="Deaths Chart">
        <Pie data={data}/>
      </div>
    );
  }

  return (
    <div className="Deaths">
      <h2>Deaths</h2>
      <DataTable
        columns={columns}
        data={deaths}
      />
    </div>
  );
}
export default Deaths;
