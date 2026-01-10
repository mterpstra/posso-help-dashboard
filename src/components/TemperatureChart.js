import React, { useState, useEffect } from 'react';
import { Fetch } from './Utils.js';
import { useTranslation } from 'react-i18next';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
);

export const TemperatureChart = (props) => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);

  useEffect(() => {
    Fetch("/api/data/temperatures", "GET", null, 
      (data) => {
        setData(aggregateData(data));
      })
  }, []);

  const aggregateData = (rawData) => {
    var agg = {};
    for(let i=0; i < rawData.length; i++) {
      const yearMonth = rawData[i].date.slice(0, 7);
      const area = rawData[i]["area"];
      if (agg[yearMonth] === undefined) {
        agg[yearMonth] = {total:0, count:0, avg:0};
      }
      agg[yearMonth].total += rawData[i]["temperature"];
      agg[yearMonth].count++;
      agg[yearMonth].avg = (agg[yearMonth].total / agg[yearMonth].count);
    }
    return agg;
  }

  let labels = [];
  let values = [];
  Object.keys(data).forEach(key => {
    labels.push(key);
    values.push(data[key].avg);
  });

  const thedata = {
    labels: labels,
    datasets: [
      {
        label: "Avg Temperature",
        data: values,
        backgroundColor: "black"
      },
    ],
  };

  return (
    <div className="Chart">
      <h3>Average Temperature by Month</h3>
      <Bar 
        data={thedata} 
        width={300}
        height={300}
      />
    </div>
  );

}
export default TemperatureChart;


