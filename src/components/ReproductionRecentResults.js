import DataCollectionPieChart from './DataCollectionPieChart.js';
import { useTranslation } from 'react-i18next';
const ReproductionRecentResults= (props) => {
  const { t } = useTranslation();
  
  const currentDateUTC = new Date();
  const today = currentDateUTC.toISOString().split('T')[0];
  const currentMonth = today.substring(0, 7);

  const aggregateData = (rawData) => {
    var xValues = [];
    var yValues = [];
    for(let i=0; i < rawData.length; i++) {

      const startDate = rawData[i].start_date.substring(0,7);
      if (startDate != currentMonth) {
        continue;
      }

      let index = xValues.indexOf(rawData[i].result);
      if (index < 0) {
        xValues.push(rawData[i].result);
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
      collection="reproduction.active"
      aggregateData={aggregateData}
      title={t("reproduction-results-for-month") + " " + currentMonth}
      colors={[
        "#B0D7FF",
        "#2D3142",
        "#ADACB5",
        "#D8D5DB",
        "#EAE8FF",
      ]}
    />
  );
}

export default ReproductionRecentResults;
