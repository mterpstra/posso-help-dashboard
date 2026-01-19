import React, { useState, useEffect } from 'react';
import { Fetch } from './Utils.js';
export const AreaDropdown = (props) => {
  const [areas, setAreaData] = useState([]);
  useEffect(() => {
    if (props.areas != null) {
      setAreaData(props.areas);
      return;
    }
    Fetch("api/data/areas", "get", null, 
      (data) => {
        setAreaData(data);
      },
      () => {console.log("error loading areas")}
    );
  }, []);


  const Option = (props) => {
    if (props.selected === props.value) {
      return <option value={props.value} selected="selected">{props.name}</option>
    } 
    return <option value={props.value}>{props.name}</option>
  }

  return (
    <select name="area" onChange={props.onChange}>
      {areas.map((area) => (
        <Option key={area.name} 
          value={area.name} 
          name={area.name}
          selected={props.selected}
        />
      ))}
    </select>
  );
}
export default AreaDropdown;
