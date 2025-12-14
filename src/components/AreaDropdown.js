import React, { useState, useEffect } from 'react';
export const AreaDropdown = (props) => {
  const [areas, setAreaData] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('zapmanejo_token');
    const url = '/api/data/areas';
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
        setAreaData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }
    fetchData();
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
