import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import "./Births.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const Births = (props) => {

  const columns = [
    {name: 'Tag',  selector: row => row.tag, sortable: true},
    {name: 'Breed',selector: row => row.breed, sortable: true},
    {name: 'Sex',  selector: row => row.sex,sortable: true},
    {name: 'Pure', selector: (row) => (row.pure_breed) ? "true" : "false", sortable: true},
    {name: 'Area', selector: row => row.area, sortable: true},
    {name: 'Date', selector: row => row.date, sortable: true},
    {name: 'Who',  selector: row => row.name, sortable: true},
    {name: 'From', selector: row => row.phone, sortable: true},
  ];

  const [births, setBirthData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('zapmanejo_token');
    const url = '/api/data/births';
    const fetchData = () => {
      fetch(url, {
        method: 'GET',
        headers: {
          "Authorization":`Bearer ${token}`,
          "Content-Type":"application/json"
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setBirthData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }
    fetchData();
  }, []);

  const aggregateData = (rawData) => {
    var xValues = [];
    var yValues = [];
    for(let i=0; i < rawData.length; i++) {
      let index = xValues.indexOf(rawData[i].breed);
      if (index < 0) {
        xValues.push(rawData[i].breed);
        yValues.push(1);
      } else {
        yValues[index]++;
      }
    }
    return {xValues:xValues, yValues:yValues}
  }
 
  if (props.graph) {
    const graphData = aggregateData(births);
    const data = {
      labels: graphData.xValues,
      datasets: [{
        label: 'Births',
        data: graphData.yValues,
        backgroundColor: ["#3F7F00", "#007F7F", "#3F007F", "#7F0000"],
        borderWidth: 1,
      }],
    };
    return (
      <div className="Births Chart">
        <Pie data={data}/>
      </div>
    );
  }

  return (
    <div className="Births">
      <h2>Births</h2>
      <DataTable
        columns={columns}
        data={births}
      />
    </div>
  );
}

export default Births;
