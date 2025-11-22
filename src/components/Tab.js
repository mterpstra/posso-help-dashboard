import './Tab.css';
import { useTranslation } from 'react-i18next';
export const Tab = (props) => {
  const handleClick = () => {
    props.onTabClicked(props.id);
  }
  return (
    <button 
      className={`Tab ${props.class_name} ${props.isActive?'active':''}`}
      onClick={handleClick}>
      {props.text}
    </button>
  );
}

export const TabList = (props) => {
  const { t } = useTranslation();
  const tabListItems = props.tabs.map((item, index) => (
    <Tab key={index} id={index} text={t(item.toLowerCase())} 
      class_name={item.toLowerCase()}
      onTabClicked={props.onTabClicked}
      isActive={(index===props.activeTab) ? true : false}
    />
  ));

  return (
    <div className="TabList white-container">
      <div className="left">
        {tabListItems}
      </div>
    </div>
  );
}
