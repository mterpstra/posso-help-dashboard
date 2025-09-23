import DataCollectionPieChart from './DataCollectionPieChart.js';
export const RainfallChart = (props) => {
  const aggregateData = (rawData) => {
    var xValues = [];
    var yValues = [];
    for(let i=0; i < rawData.length; i++) {
      const yearMonth = rawData[i].date.slice(0, 7);
      let index = xValues.indexOf(yearMonth);
      if (index < 0) {
        xValues.push(yearMonth);
        yValues.push(rawData[i]["amount"]);
      } else {
        yValues[index] += rawData[i]["amount"];
      }
    }
    return {xValues:xValues, yValues:yValues}
  }
  return (
    <DataCollectionPieChart
      collection="rain"
      aggregateData={aggregateData}
      title="Rainfall by Month" 
      colors={["#7F0070", "#7F4E00", "#007F0F", "##00317F"]}
    />
  );
}
export default RainfallChart;
