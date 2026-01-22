import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Chart as ChartJS } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Fetch } from '../../Utils.js';
ChartJS.register();

const HerdByCauseOfDeath= (props) => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const labels = [];
  const totals = [];
  const percentages = [];
  const inner_colors=[];
  const colors=[ 
    "#4E5166", "#7C90A0", "#B5AA9D", "#B9B7A7", "#747274",
    "#E7E6F7", "#E3D0D8", "#AEA3B0", "#827081", "#C6D2ED",
  ];

  // For inner colors, just add a shade at the end.
  for (let i=0; i < colors.length; i++) {
    const inner_color = `${colors[i]}D0`;
    inner_colors.push(inner_color);
  }

  useEffect(() => {
    Fetch("/api/data/births", "GET", null, 
      (data) => {setData(data)});
  }, []);

  const aggregateData = (rawData) => {
    for(let i=0; i < rawData.length; i++) {
      let index = labels.indexOf(rawData[i].cause);
      if (index < 0) {
        labels.push(rawData[i].cause);
        totals.push(1);
        percentages.push(0);
      } else {
        totals[index]++;
      }
    }

    // Convert the totals to percentage
    for(let i=0; i < percentages.length; i++) {
      percentages[i] = Math.round((totals[i] / rawData.length) * 100);
    }

    // Convert the code names to language
    // correct readable values.
    for(let i=0; i < labels.length; i++) {
      labels[i] = t(labels[i]);
    }
  }

  const options = {
    plugins: {
      legend: {
        labels: {
          filter: (legendItem, chart) => {
            // Show only the first 5 labels
            return legendItem.index < 5;
          }
        }
      },
      tooltip: {
        enabled: true, // Show or hide tooltips
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += context.parsed;
            }
            if (context.dataset.suffix !== undefined) {
              label += context.dataset.suffix;
            }
            return label;
          }
        }
      }
    }
  };

  const graphData = aggregateData(data);
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Total",
        data: totals,
        backgroundColor: colors,
        borderWidth: 0,
      },
      {
        label: "Percentage",
        data: percentages,
        backgroundColor: inner_colors,
        borderWidth: 0,
        suffix: "%",
      }],
  };


  return (
    <div className="Chart">
      <h3>{t("herd_by_cause_of_death")}</h3>
      <Pie data={chartData} options={options}/>
    </div>
  );
}

export default HerdByCauseOfDeath;
