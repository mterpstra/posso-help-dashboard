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

  return (
    <select name="protocol_name">
      {protocols.map((protocol) => (
        // @todo: value should probably be "ID"
        <option key={protocol.name} value={protocol.name}>
          {protocol.name}
        </option>
      ))}
    </select>
  );
}
export default ProtocolDropdown;
