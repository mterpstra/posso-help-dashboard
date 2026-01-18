import DataCollectionPieChart from './DataCollectionPieChart.js';
import { useTranslation } from 'react-i18next';
export const DeathChart = (props) => {
  const { t } = useTranslation();
  const aggregateData = (rawData) => {
    var xValues = [];
    var yValues = [];
    for(let i=0; i < rawData.length; i++) {
      let index = xValues.indexOf(rawData[i].cause);
      if (index < 0) {
        xValues.push(rawData[i].cause);
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
      title={t("deaths_by_cause")}
      colors={[
        "#4E5166", "#7C90A0", "#B5AA9D", "#B9B7A7", "#747274",
        "#E7E6F7", "#E3D0D8", "#AEA3B0", "#827081", "#C6D2ED",
      ]}
    />
  );
}
export default DeathChart;
