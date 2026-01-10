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
        setData(data);
      })
  }, []);


  const getLabels = (rawData) => {
    var labels = [];
    for(let i=0; i < rawData.length; i++) {
      const yearMonth = rawData[i].date.slice(0, 7);
      let index = labels.indexOf(yearMonth);
      if (index < 0) {
        labels.push(yearMonth);
      } 
    }
    return labels;
  }

  const aggregateData = (rawData) => {
    var agg = {};
    for(let i=0; i < rawData.length; i++) {
      const yearMonth = rawData[i].date.slice(0, 7);
      const area = rawData[i]["area"];
      if (agg[yearMonth] === undefined) {
        agg[yearMonth] = {};
      }
      if (agg[yearMonth]["all_areas"] === undefined) {
        agg[yearMonth]["all_areas"] = {total:0, count:0};
      }
      if (agg[yearMonth][area] === undefined) {
        agg[yearMonth][area] = {total:0, count:0};
      }
      agg[yearMonth]["all_areas"].total += rawData[i]["temperature"];
      agg[yearMonth]["all_areas"].count++;
      agg[yearMonth][area].total += rawData[i]["temperature"];
      agg[yearMonth][area].count++;
    }
    return agg;
  }



  const graphData = aggregateData(data);
  const labels = graphData.months;

  const thedata = {
    labels,
    datasets: [],
  };


  for (const [key, value] of Object.entries(graphData)) {
    console.log(`${key}: ${value}`);
    thedata.datasets.push(
      {
        label: `Average Rainfall by ${key}`,
        data: value.all_areas,
        backgroundColor: "#BAA898",
      }
    )
  }






  return (
    <div className="Chart">
      <h3>Average Rainfall by Month</h3>
      <Bar data={thedata} />
    </div>
  );

}
export default TemperatureChart;


