import React, { useState, useEffect } from 'react';
export const AreaDropdown = (props) => {
  const token = localStorage.getItem('zapmanejo_token');
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

  return (
    <select name="area">
      {areas.map((area) => (
        <option key={area.name} value={area.name}>
          {area.name}
        </option>
      ))}
    </select>
  );
}
export default AreaDropdown;
