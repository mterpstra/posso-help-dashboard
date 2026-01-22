import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Fetch } from '../../Utils.js';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ReproductionSuccessByMonthAndGroup = (props) => {

  const colors = [
    "#ffdd22",
    "#dd8844",
    "#aa4499",
    "#d26432",
    "#ddab56",
    "#ad4ff4",
    "#382371",
    "#848439",
    "#749302",
    "#748393",
  ];

  const { t } = useTranslation();
  const months = useRef([]);
  const groups = useRef([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    Fetch("/api/data/reproduction.active", "GET", null, 
      (data) => {
        setData(aggregateData(data))
      });
  }, []);


  const aggregateData = (raw) => {
    const agg = {};

    for (let i=0; i < raw.length; i++) {
      const month = raw[i].start_date.substring(0,7);
      const group = raw[i].nickname; 
      const result = raw[i].result; 

      if (agg[month] == undefined) {
        agg[month] = {};
      }

      if (agg[month][group] == undefined) {
        agg[month][group] = {total:0, success:0, percent:0};
      }

      agg[month][group].total++;

      if (result === "pregnancy_birth") {
        agg[month][group].success++;
      }

      agg[month][group].percent = Math.round(     
        (agg[month][group].success / agg[month][group].total) * 100
      );

      if (months.current.indexOf(month) === -1) {
        months.current.push(month);
      }

      if (groups.current.indexOf(group) === -1) {
        groups.current.push(group);
      }
    }

    months.current = months.current.sort();
    return(agg);
  };

  const options = {
    responsive: true,
    scales: {
      y: { 
        min: 0,
        max: 100,
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        position: 'left',
        display: true,
        text: t("birth-rate-percentage"),
      },
    },
  };

  const the_data = {
    labels: months.current,
    datasets: [],
  };

  for (let i=0; i < groups.current.length; i++) {
    const group = groups.current[i];
    const dataset = {
      label: group,
      data:[],
      backgroundColor: colors[i],
      borderColor: colors[i],
    }

    for (let j=0; j < months.current.length; j++) {
      const month = months.current[j];

      if ((data[month] !== undefined) &&
          (data[month][group] !== undefined) &&
          (data[month][group].percent !== undefined)) {
        const percent = data[month][group].percent;
        dataset.data.push(percent);
      } else {
        dataset.data.push(0);
      }
    }
    the_data.datasets.push(dataset);
  }

  return ( <div className="Chart">
      <h3>{t("iatf-success-rate-by-group")}</h3>
      <Line data={the_data} 
        options={options}
        height={400}
        width={600}
      />
    </div>
  );
}

export default ReproductionSuccessByMonthAndGroup;
