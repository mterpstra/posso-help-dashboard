import DataTable from 'react-data-table-component';
import React, { useState, useEffect } from 'react';

export const Teams = (props) => {
  const [teams, setTeamData] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('zapmanejo_token');
    const user  = localStorage.getItem('zapmanejo_user');
    const url = '/api/data/teams';
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
        setTeamData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }
    fetchData();
  }, []);

  const columns = [
    { name: 'Name',         selector: row => row.name},
    { name: 'Phone Number', selector: row => row.phone_number},
  ];

  return (
    <div className="Teams">
      <h2>Team</h2>
      <DataTable 
        data={teams}
        columns={columns}
      />
    </div>
  );
}
export default Teams;
