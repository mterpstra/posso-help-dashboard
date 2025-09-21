import DataTable from 'react-data-table-component';
import React, { useState, useEffect } from 'react';

export const Teams = (props) => {
  const [teams, setTeamData] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('zapmanejo_token');
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
    { name: 'Owner Phone',              selector: row => row.phone},
    { name: 'Owner Name',               selector: row => row.name },
    { name: 'Team Member Name',         selector: row => row.team_member_name},
    { name: 'Team Member Phone Number', selector: row => row.team_member_phone_number},
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
