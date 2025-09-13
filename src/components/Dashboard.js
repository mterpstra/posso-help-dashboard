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

import { TabList } from './Tab.js';
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
    if ((activeTab === 1) && addActive) return "add-birth";
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

  const screen = getComponent(); 
  console.log("showing screen", screen);
  return (
    <div className='Dashboard'>
      <Header user={props.user}/>
      <TabList 
        tabs={tabs} 
        activeTab={activeTab}
        onTabClicked={onTabClicked}
        showAddButton={screen==="births"}
        onAddClicked={onAddClicked}
      />
      <div className='white-container'>
        {(screen === "overview")     && <Overview/>}
        {(screen === "births")       && <Births/>}
        {(screen === "deaths")       && <Deaths/>}
        {(screen === "rainfall")     && <Rainfall/>}
        {(screen === "temperatures") && <Temperatures/>}
        {(screen === "areas")        && <Areas/>}
        {(screen === "teams")        && <Teams/>}
        {(screen === "add-birth")    && <AddBirth onSuccess={onAddClicked}/>}
      </div>
    </div>
  );
}
export default Dashboard;
