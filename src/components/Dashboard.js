import React, { useState } from 'react';
import './Dashboard.css';
import Header from './Header.js';

import Overview from './Overview.js';
import Births from './Births.js';
import Deaths from './Deaths.js';
import Rainfall from './Rainfall.js';
import Temperature from './Temperature.js';
import Areas from './Areas.js';
import Teams from './Teams.js';

import { TabList } from './Tab.js';
const Dashboard = (props) => {
  console.log("Dashboard props", props);
  const tabs = [
    "Overview", 
    "Births",
    "Deaths",
    "Rainfall",
    "Temperature",
    "Areas",
    "Team"
  ];
  const [activeTab, setActiveTab] = useState(0);
  const onTabClicked= (id) => {
    console.log("Tab Clicked:", id);
    setActiveTab(id);
  }
  return (
    <div className='Dashboard'>
      <Header user={props.user}/>
      <TabList 
        tabs={tabs} 
        activeTab={activeTab}
        onTabClicked={onTabClicked}
      />
      <div className='white-container'>
        <h2>Content</h2>
        {(activeTab === 0) && <Overview/>}
        {(activeTab === 1) && <Births/>}
        {(activeTab === 2) && <Deaths/>}
        {(activeTab === 3) && <Rainfall/>}
        {(activeTab === 4) && <Temperature/>}
        {(activeTab === 5) && <Areas/>}
        {(activeTab === 6) && <Teams/>}
      </div>
    </div>
  );
}
export default Dashboard;
