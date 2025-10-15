import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DataCollectionPieChart = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('zapmanejo_token');
    const url = `/api/data/${props.collection}`;
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
          if (response.status === 401) {
            localStorage.removeItem('zapmanejo_token');
            localStorage.removeItem('zapmanejo_user');
            window.location.reload();
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }
    fetchData();
  }, []);

  const graphData = props.aggregateData(data);
  const chartData = {
    labels: graphData.xValues,
    datasets: [{
      label: props.title,
      data: graphData.yValues,
      backgroundColor: props.colors,
      borderWidth: 1,
      title: props.title,
    }],
  };

  return (
    <div className="Chart">
      <h3>{props.title}</h3>
      <Pie data={chartData}/>
    </div>
  );
}

export default DataCollectionPieChart;
