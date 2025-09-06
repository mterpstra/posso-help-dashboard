import DataTable from 'react-data-table-component';
import React, { useState, useEffect } from 'react';

export const Areas = (props) => {

  const [areas, setAreaData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('zapmanejo_token');
    const url = '/api/data/tags';
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

  const Split = ({ row }) => (
    <div>
    {row.matches.join(", ")}
    </div>
  );


  const columns = [
    { name: 'Value',    selector: row => row.value },
    { name: 'Name',     selector: row => row.display_name },
    { name: 'Matches',  selector: row => row.matches, cell: row => <Split row={row} />},
  ];


  if (areas === null) return;
  if (areas.length === 0) return;

  return (
    <div>
    <h2>Areas Component</h2>
    <DataTable
      data={areas[0].values}
      columns={columns}
    />
    </div>
  );
}
export default Areas;
