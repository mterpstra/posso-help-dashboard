import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import "./Births.css";

const Births = () => {

  const columns = [
    {name: 'Tag',  selector: row => row.tag, sortable: true},
    {name: 'Breed',selector: row => row.breed, sortable: true},
    {name: 'Sex',  selector: row => row.sex,sortable: true},
    {name: 'Pure', selector: (row) => (row.pure_breed) ? "true" : "false", sortable: true},
    {name: 'Area', selector: row => row.area, sortable: true},
    {name: 'Date', selector: row => row.date, sortable: true},
    {name: 'Who',  selector: row => row.name, sortable: true},
    {name: 'From', selector: row => row.phone, sortable: true},
  ];

  const [births, setBirthData] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('zapmanejo_token');
    const url = '/api/data/births/16166100305';
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
        setBirthData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }

    fetchData();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="Births">
      <h2>Births</h2>
      <DataTable
        columns={columns}
        data={births}
      />
    </div>
  );
}

export default Births;
