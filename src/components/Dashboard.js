import React, { useState } from 'react';
import './Dashboard.css';
import Header from './Header.js';
import Overview from './Overview.js';
import Births from './Births.js';
import Deaths from './Deaths.js';
import Rainfall from './Rainfall.js';
import Temperatures from './Temperatures.js';
import Reproduction from './Reproduction.js';
import Areas from './Areas.js';
import Teams from './Teams.js';
import Profile from './Profile.js';
import { TabList } from './Tab.js';

const Dashboard = (props) => {
  const tabs = [
    "Overview", 
    "Births",
    "Deaths",
    "Rainfall",
    "Temperatures",
    "Reproduction",
    "Areas",
    "Team"
  ];
  const getComponent = () => {
    if (activeTab === 1) return "births";
    if (activeTab === 2) return "deaths";
    if (activeTab === 3) return "rainfall";
    if (activeTab === 4) return "temperatures";
    if (activeTab === 5) return "reproduction";
    if (activeTab === 6) return "areas";
    if (activeTab === 7) return "teams";
    if (activeTab === 9) return "profile";
    return "overview";
  };
  const [activeTab, setActiveTab] = useState(0);
  const onTabClicked = (id) => {
    setActiveTab(id);
  }
  const onClickProfile = () => {
    setActiveTab(9);
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
      <div className='white-container'>
        {(screen === "overview")        && <Overview/>}
        {(screen === "births")          && <Births/>}
        {(screen === "deaths")          && <Deaths/>}
        {(screen === "rainfall")        && <Rainfall/>}
        {(screen === "temperatures")    && <Temperatures/>}
        {(screen === "reproduction")    && <Reproduction/>}
        {(screen === "areas")           && <Areas/>}
        {(screen === "teams")           && <Teams/>}
        {(screen === "profile")         && <Profile/>}
      </div>
    </div>
  );
}
export default Dashboard;
