import React, { useState, useEffect, useRef } from 'react';
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

  const colors = ["#383F51","#DDDBF1", "#3C4F76", "#D1BEB0", "#AB9F9D" ];

  const { t } = useTranslation();
  const [data, setData] = useState([]);

  const months = useRef([]);
  const areas  = useRef([]);

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

      if (months.current.indexOf(yearMonth) === -1) {
        months.current.push(yearMonth);
      }
      if (areas.current.indexOf(area) === -1) {
        areas.current.push(area);
      }

      if (agg[yearMonth] === undefined) {
        agg[yearMonth] = {};
      }
      if (agg[yearMonth]["all"] === undefined) {
        agg[yearMonth]["all"] = {total:0, count:0, avg:0};
      }
      if (agg[yearMonth][area] === undefined) {
        agg[yearMonth][area] = {total:0, count:0, avg:0};
      }

      agg[yearMonth]["all"].total += rawData[i]["temperature"];
      agg[yearMonth]["all"].count++;
      agg[yearMonth]["all"].avg = (agg[yearMonth]["all"].total / agg[yearMonth]["all"].count);

      agg[yearMonth][area].total += rawData[i]["temperature"];
      agg[yearMonth][area].count++;
      agg[yearMonth][area].avg = (agg[yearMonth][area].total / agg[yearMonth][area].count);
    }

    months.current.sort();
    areas.current.sort();

    return agg;
  }

  const thedata = {
    labels: months.current,
    datasets: [],
  };

  const getArrayofAvgByMonthForArea = (area) => {
    const arr = [];
    months.current.forEach((month, index) => {
      if ((data[month] !== undefined) && (data[month][area] !== undefined)) {
        arr.push(data[month][area].avg);
      } else {
        arr.push(0);
      }
    });
    return arr;
  }


  thedata.datasets.push({
    label: t("all"),
    data: getArrayofAvgByMonthForArea("all"),
    backgroundColor: "black"
  });

  areas.current.forEach((area, index) => {
    thedata.datasets.push({
      label: area,
      data: getArrayofAvgByMonthForArea(area),
      backgroundColor: colors[index], 
    });
  });

  return (
    <div className="Chart">
      <h3>{t("temperature_by_month")}</h3>
      <Bar 
        data={thedata} 
        width={300}
        height={300}
      />
    </div>
  );

}
export default TemperatureChart;


