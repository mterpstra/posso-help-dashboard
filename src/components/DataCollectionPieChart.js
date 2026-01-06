import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Fetch } from './Utils.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DataCollectionPieChart = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const url = `/api/data/${props.collection}`;
    Fetch(url, "GET", null, 
      (data) => {
        setData(data);
      });
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
