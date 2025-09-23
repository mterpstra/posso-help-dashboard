import DataCollectionPieChart from './DataCollectionPieChart.js';
export const DeathChart = (props) => {
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
    return {xValues:xValues, yValues:yValues}
  }
  return (
    <DataCollectionPieChart
      collection="deaths"
      aggregateData={aggregateData}
      title="Deaths by Cause" 
      colors={["#37007F", "#7F0008", "#487F00", "#007F77"]}
    />
  );
}
export default DeathChart;
