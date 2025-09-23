import DataTable from 'react-data-table-component';
import React, { useState, useEffect } from 'react';

export const Areas = (props) => {
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

  const columns = [
    { name: 'Area',     selector: row => row.name },
    { name: 'Matches',  selector: row => row.matches },
  ];

  if (areas === null) return;
  if (areas.length === 0) return;

  return (
    <div>
    <h2>Areas</h2>
    <DataTable
      data={areas}
      columns={columns}
    />
    </div>
  );
}
export default Areas;
