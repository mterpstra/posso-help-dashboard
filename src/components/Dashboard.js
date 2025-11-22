import React, { useState } from 'react';
import './Dashboard.css';
import Header from './Header.js';
import Overview from './Overview.js';
import Birth from './Birth.js';
import Death from './Deaths.js';
import Rain from './Rain.js';
import Temperatures from './Temperatures.js';
import Areas from './Areas.js';
import Teams from './Teams.js';
import { TabList } from './Tab.js';
import Profile from './Profile.js';

const Dashboard = (props) => {
  const tabs = [
    "Overview", 
    "Births",
    "Deaths",
    "Rain",
    "Temperatures",
    "Areas",
    "Team"
  ];

  const getComponent = () => {
    if (activeTab === 1) return "births";
    if (activeTab === 2) return "deaths";
    if (activeTab === 3) return "rain";
    if (activeTab === 4) return "temperatures";
    if (activeTab === 5) return "areas";
    if (activeTab === 6) return "teams";
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
        {(screen === "births")          && <Birth/>}
        {(screen === "deaths")          && <Death/>}
        {(screen === "rain")            && <Rain/>}
        {(screen === "temperatures")    && <Temperatures/>}
        {(screen === "areas")           && <Areas/>}
        {(screen === "teams")           && <Teams/>}
        {(screen === "profile")         && <Profile/>}
      </div>
    </div>
  );
}
export default Dashboard;
