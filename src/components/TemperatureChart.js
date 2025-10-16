import DataCollectionPieChart from './DataCollectionPieChart.js';
import { useTranslation } from 'react-i18next';
export const TemperatureChart = (props) => {
  const { t } = useTranslation();
  const aggregateData = (rawData) => {
    var xValues = [];
    var yValues = [];
    for(let i=0; i < rawData.length; i++) {
      const yearMonth = rawData[i].date.slice(0, 7);
      let index = xValues.indexOf(yearMonth);
      if (index < 0) {
        xValues.push(yearMonth);
        yValues.push(rawData[i]["temperature"]);
      } else {
        yValues[index] += rawData[i]["temperature"];
      }
    }
    return {xValues:xValues, yValues:yValues}
  }
  return (
    <DataCollectionPieChart
      collection="temperature"
      aggregateData={aggregateData}
      title={t("temperature_by_month")}
      colors={["#7F3500", "#0B7F00", "#004A7F", "#74007F"]}
    />
  );

}
export default TemperatureChart;
