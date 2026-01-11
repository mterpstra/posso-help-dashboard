import React, { useState } from 'react';
import './Dashboard.css';
import Header from './Header.js';
import Overview from './Overview.js';
import Birth from './Birth.js';
import Rain from './Rain.js';
import Temperatures from './Temperatures.js';
import Reproduction from './Reproduction.js';
import RebanhoTab from './RebanhoTab.js';
import ReproductionV2 from './ReproductionV2.js';


import Areas from './Areas.js';
import Teams from './Teams.js';
import Profile from './Profile.js';
import { TabList } from './Tab.js';

const Dashboard = (props) => {
  const tabs = [
    "Overview", 
    "Births",
    "Rain",
    "Temperatures",
    "Areas",
    "Team",
    "Reproduction"
  ];
  const getComponent = () => {
    if (activeTab === 1) return "births";
    if (activeTab === 2) return "rain";
    if (activeTab === 3) return "temperatures";
    if (activeTab === 4) return "areas";
    if (activeTab === 5) return "teams";
    if (activeTab === 6) return "reproductionV2";

    if (activeTab === 10) return "profile";
    return "overview";
  };
  const [activeTab, setActiveTab] = useState(0);
  const onTabClicked = (id) => {
    setActiveTab(id);
  }
  const onClickProfile = () => {
    setActiveTab(10);
  }
  const screen = getComponent(); 
  return (
    <div className='Dashboard'>
      <Header user={props.user}
        onClickProfile={onClickProfile}
      />
      <TabList 
        tabs={tabs} 
        activeTab={activeTab}
        onTabClicked={onTabClicked}
      />
      <div className='white-container dashboard-content'>
        {(screen === "overview")        && <Overview/>}
        {(screen === "births")          && <Birth/>}
        {(screen === "rain")            && <Rain/>}
        {(screen === "temperatures")    && <Temperatures/>}
        {(screen === "areas")           && <Areas/>}
        {(screen === "teams")           && <Teams/>}
        {(screen === "reproductionV2")  && <ReproductionV2/>}
        {(screen === "profile")         && <Profile/>}
      </div>
    </div>
  );
}
export default Dashboard;
