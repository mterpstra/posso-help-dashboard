import React, { useState, useEffect } from 'react';
export const ProtocolDropdown = (props) => {
  const [protocols, setProtocolData] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('zapmanejo_token');
    const url = '/api/data/reproduction.protocols';
    const fetchData = () => {
      fetch(url, {
        method: 'GET',
        headers: {
          "Authorization":`Bearer ${token}`,
          "Content-Type":"application/json"
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setProtocolData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }
    fetchData();
  }, []);


  const Option = (props) => {
    const selected = (props.name === props.selected) ? "selected" : "";
    return (
      <option key={props.name} value={props.name} selected={selected}>
        {props.name}
      </option>
    );
  }

  return (
    <select name="protocol_name">
      {protocols.map((protocol) => (
        <Option 
          name={protocol.name}
          selected={props.value}
        />
      ))}
    </select>
  );
}
export default ProtocolDropdown;
