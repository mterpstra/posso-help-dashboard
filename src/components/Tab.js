import './Tab.css';
export const Tab = (props) => {
  const handleClick = () => {
    props.onTabClicked(props.id);
  }
  return (
    <button 
      className={`Tab ${props.isActive?'active':''}`}
      onClick={handleClick}>
      {props.text}
    </button>
  );
}

export const TabList = (props) => {
  const tabListItems = props.tabs.map((item, index) => (
    <Tab key={index} id={index} text={item} 
      onTabClicked={props.onTabClicked}
      isActive={(index===props.activeTab) ? true : false}
    />
  ));
  return (
    <div className="TabList white-container">
      {tabListItems}
    </div>
  );
}
