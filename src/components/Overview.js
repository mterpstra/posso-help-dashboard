import './Overview.css';
import { useTranslation } from 'react-i18next';
import HerdByBreed from './charts/herd/HerdByBreed.js';
import HerdByCauseOfDeath from './charts/herd/HerdByCauseOfDeath.js';
import RainfallChart from './RainfallChart.js';
import TemperatureChart from './TemperatureChart.js';
import AgeCategoryChart from './AgeCategoryChart.js';
import ReproductionRecentResults from './ReproductionRecentResults.js';

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
        <ReproductionRecentResults/>
      </div>
    </div>
  );
}
export default Overview;
