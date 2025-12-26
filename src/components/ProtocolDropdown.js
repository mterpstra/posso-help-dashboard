import React, { useState, useEffect } from 'react';
import { Get } from './Get.js';
export const ProtocolDropdown = (props) => {
  const [protocols, setProtocolData] = useState([]);
  useEffect(() => {
    Get('reproduction.protocols', 
      (data) => {setProtocolData(data)});
  }, []);

  const Option = (props) => {
    const value=`${props.id}::${props.name}`;
    const selected = (props.name === props.selected) ? "selected" : "";
    return (
      <option key={props.name} 
        value={value}
        selected={selected}>
        {props.name}
      </option>
    );
  }

  return (
    <select name="protocol">
      {protocols.map((protocol) => (
        <Option 
          name={protocol.name}
          id={protocol._id}
          selected={props.value}
        />
      ))}
    </select>
  );
}
export default ProtocolDropdown;
