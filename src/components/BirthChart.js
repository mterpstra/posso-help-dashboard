import DataCollectionPieChart from './DataCollectionPieChart.js';
const BirthChart = (props) => {
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
    return {xValues:xValues, yValues:yValues}
  }
  return (
    <DataCollectionPieChart
      collection="births"
      aggregateData={aggregateData}
      title="Births by Breed" 
      colors={["#3F7F00", "#007F7F", "#3F007F", "#7F0000"]}
    />
  );
}

export default BirthChart;
