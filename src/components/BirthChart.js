import DataCollectionPieChart from './DataCollectionPieChart.js';
import { useTranslation } from 'react-i18next';
const BirthChart = (props) => {
  const { t } = useTranslation();
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

    // Convert the code names to language
    // correct readable values.
    for(let i=0; i < xValues.length; i++) {
      xValues[i] = t(xValues[i]);
    }

    return {xValues:xValues, yValues:yValues}
  }
  return (
    <DataCollectionPieChart
      collection="births"
      aggregateData={aggregateData}
      title={t("births_by_breed")}
      colors={["#B6D094", "#E1AA7D", "#BE8A60", "#6A2E35", "#2E2836"]}
    />
  );
}

export default BirthChart;
