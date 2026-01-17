import React, { useState, useEffect, useRef } from 'react';
import { Fetch } from './Utils.js';
import { useTranslation } from 'react-i18next';
import { daysSince } from './Utils.js';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js';
ChartJS.register();

export const AgeCategoryChart = (props) => {
  
  const categories = [
    {min:7,  max:7,  name:"seven_months"},
    {min:8,  max:8,  name:"eight_months"},
    {min:9,  max:9,  name:"nine_months"},
    {min:10, max:12, name:"ten_twelve_months"},
  ];

  const getCategoryByDate = (date) => {
    const months = Math.floor(daysSince(date)/30);
    let date_category  = "out-of-range";
    const test = categories.forEach((category, index) => {
      if ((months >= category.min) && (months <= category.max)) {
        date_category = category.name;
      }
    });
    return date_category;
  }

  const { t } = useTranslation();
  const [data, setData] = useState([]);
  useEffect(() => {
    Fetch("/api/data/births", "GET", null, 
      (data) => {
        setData(aggregageData(data));
      })
  }, []);

  const aggregageData = (data) => {
    const totals = {};
    categories.forEach((category, index) => {
      totals[category.name] = 0;
    });
    data.forEach((herd, i) => {
      const category = getCategoryByDate(herd.date);
      totals[category]++;
    });
    return [
      totals[categories[0].name],
      totals[categories[1].name],
      totals[categories[2].name],
      totals[categories[3].name],
    ]
  }

  const thedata = {
    labels: categories.map((category) => {return t(category.name)}),
    datasets: [{
      data: data,
      backgroundColor: ["#00BFB2", "#028090", "#F0F3BD", "#C64191", "#1A5E63"]
    }],
  };

  const options = {
    plugins: {
      legend: {
        display:false,
      },
    },
  };

  return (
    <div className="Chart">
      <h3>{t("age_category")}</h3>
      <Bar 
        data={thedata} 
        options={options}
        width={300}
        height={300}
      />
    </div>
  );
}
export default AgeCategoryChart;
