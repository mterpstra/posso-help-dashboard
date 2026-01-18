import './Overview.css';
import { useTranslation } from 'react-i18next';
import BirthChart from './BirthChart.js';
import DeathChart from './DeathChart.js';
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
        <BirthChart/>
        <DeathChart/>
        <RainfallChart/>
      </div>
      <div className="container">
        <TemperatureChart/>
        <AgeCategoryChart/>
        <ReproductionRecentResults/>
      </div>
    </div>
  );
}
export default Overview;
