import './Overview.css';
import { useTranslation } from 'react-i18next';
import HerdByBreed               from './charts/herd/HerdByBreed.js';
import HerdByCauseOfDeath        from './charts/herd/HerdByCauseOfDeath.js';
import ReproductionRecentResults from './charts/reproduction/ReproductionRecentResults.js';
import ReproductionSuccessByMonthAndGroup from './charts/reproduction/ReproductionSuccessByMonthAndGroup.js';
import RainfallChart    from './RainfallChart.js';
import TemperatureChart from './TemperatureChart.js';
import AgeCategoryChart from './AgeCategoryChart.js';

export const Overview = (props) => {
  const { t } = useTranslation();
  return (
    <div className="Overview">
      <h2>{t("overview_title")}</h2>
      <div className="container">
        <HerdByBreed/>
        <HerdByCauseOfDeath/>
      </div>
      <div className="container">
        <RainfallChart/>
        <TemperatureChart/>
      </div>
      <div className="container">
        <AgeCategoryChart/>
      </div>
      <div className="container">
        <ReproductionRecentResults/>
        <ReproductionSuccessByMonthAndGroup/>
      </div>
    </div>
  );
}
export default Overview;
