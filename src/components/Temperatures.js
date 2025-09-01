import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

export const Temperatures = (props) => {
  const [temperatures, setTemperatures] = useState([]);
  const token = localStorage.getItem('zapmanejo_token');
  const url = '/api/data/temperature/16166100305';

  const columns = [
    {name:"Temperature", selector: row => `${row.temperature} celcius`, sortable:true},
    {name:"Date", selector: row => row.date, sortable:true},
    {name:"Who", selector: row => row.name, sortable:true},
    {name:"From", selector: row => row.phone, sortable:true},
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            "Authorization":`Bearer ${token}`,
            "Content-Type":"application/json"
          }});
        if (!response.ok) {
          // @todo:  Probably need to check the "success" flag.
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setTemperatures(result);
      } catch (err) {
        console.log("error", err);
      } finally {
        console.log("Finally...");
      }
    };
    fetchData();
  }, []);


  return (
    <div className="Temperature">
      <h2>Temperatures</h2>
      <DataTable
        columns={columns}
        data={temperatures}
      />
    </div>
  );
}
export default Temperatures;
