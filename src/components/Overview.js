import './Overview.css';
import BirthChart from './BirthChart.js';
import DeathChart from './DeathChart.js';
import RainfallChart from './RainfallChart.js';
import TemperatureChart from './TemperatureChart.js';
export const Overview = (props) => {
  return (
    <div className="Overview">
      <h2>Overview</h2>
      <div className="container">
        <BirthChart/>
        <DeathChart/>
        <RainfallChart/>
        <TemperatureChart/>
      </div>
    </div>
  );
}
export default Overview;
