import React, { useState } from 'react';
import './Dashboard.css';
import Header from './Header.js';
import Overview from './Overview.js';
import Births from './Births.js';
import Deaths from './Deaths.js';
import Rainfall from './Rainfall.js';
import Temperatures from './Temperatures.js';
import Areas from './Areas.js';
import Teams from './Teams.js';
import AddBirth from './AddBirth.js';
import AddDeath from './AddDeath.js';
import AddTemperature from './AddTemperature.js';
import AddRain from './AddRain.js';
import AddArea from './AddArea.js';
import AddTeam from './AddTeam.js';
import { TabList } from './Tab.js';
import Profile from './Profile.js';

const Dashboard = (props) => {
  const tabs = [
    "Overview", 
    "Births",
    "Deaths",
    "Rainfall",
    "Temperatures",
    "Areas",
    "Team"
  ];

  const getComponent = () => {
    if (activeTab === 9) return "profile";

    if ((activeTab === 1) && addActive) return "add-birth";
    if ((activeTab === 2) && addActive) return "add-death";
    if ((activeTab === 3) && addActive) return "add-rainfall";
    if ((activeTab === 4) && addActive) return "add-temperature";
    if ((activeTab === 5) && addActive) return "add-area";
    if ((activeTab === 6) && addActive) return "add-team";

    if (activeTab === 1) return "births";
    if (activeTab === 2) return "deaths";
    if (activeTab === 3) return "rainfall";
    if (activeTab === 4) return "temperatures";
    if (activeTab === 5) return "areas";
    if (activeTab === 6) return "teams";

    return "overview";
  };
  
  const [activeTab, setActiveTab] = useState(0);
  const [addActive, setAddActive] = useState(false);

  const onTabClicked = (id) => {
    setActiveTab(id);
    setAddActive(false);
  }

  const onAddClicked = () => {
    setAddActive(!addActive);
  }

  const onClickProfile = () => {
    setActiveTab(9);
  }

  const screen = getComponent(); 
  const addScreens = ["births", "deaths", "rainfall", "temperatures", "areas", "teams"];
  return (
    <div className='Dashboard'>
      <Header user={props.user}
        onClickProfile={onClickProfile}
      />
      <TabList 
        tabs={tabs} 
        activeTab={activeTab}
        onTabClicked={onTabClicked}
        showAddButton={addScreens.includes(screen)}
        onAddClicked={onAddClicked}
      />
      <div className='white-container'>
        {(screen === "overview")        && <Overview/>}
        {(screen === "births")          && <Births/>}
        {(screen === "deaths")          && <Deaths/>}
        {(screen === "rainfall")        && <Rainfall/>}
        {(screen === "temperatures")    && <Temperatures/>}
        {(screen === "areas")           && <Areas/>}
        {(screen === "teams")           && <Teams/>}
        {(screen === "add-birth")       && <AddBirth onSuccess={onAddClicked}/>}
        {(screen === "add-death")       && <AddDeath onSuccess={onAddClicked}/>}
        {(screen === "add-rainfall")    && <AddRain onSuccess={onAddClicked}/>}
        {(screen === "add-temperature") && <AddTemperature onSuccess={onAddClicked}/>}
        {(screen === "add-area")        && <AddArea onSuccess={onAddClicked}/>}
        {(screen === "add-team")        && <AddTeam onSuccess={onAddClicked}/>}

        {(screen === "profile")         && <Profile/>}
      </div>
    </div>
  );
}
export default Dashboard;
