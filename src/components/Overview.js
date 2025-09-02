import './Overview.css';
import Births from './Births.js';
import Deaths from './Deaths.js';
import Rainfall from './Rainfall.js';
import Temperatures from './Temperatures.js';
export const Overview = (props) => {
  return (
    <div className="Overview">
      <h2>Overview</h2>
      <div className="container">
        <Births graph={true}/>
        <Deaths graph={true}/>
        <Rainfall graph={true}/>
        <Temperatures graph={true}/>
      </div>
    </div>
  );
}
export default Overview;
