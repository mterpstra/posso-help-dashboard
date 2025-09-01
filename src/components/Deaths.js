import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

export const Deaths = (props) => {
  const [deaths, setDeaths] = useState([]);
  const token = localStorage.getItem('zapmanejo_token');
  const url = '/api/data/deaths/16166100305';

  const columns = [
    {name:"Tag", selector: row => row.tag, sortable:true},
    {name:"Cause", selector: row => row.cause, sortable:true},
    {name:"Sex", selector: row => row.sex, sortable:true},
    {name:"Area", selector: row => row.area, sortable:true},
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
        setDeaths(result);
      } catch (err) {
        console.log("error", err);
      } finally {
        console.log("Finally...");
      }
    };
    fetchData();
  }, []);


  return (
    <div className="Deaths">
      <h2>Deaths</h2>
      <DataTable
        columns={columns}
        data={deaths}
      />
    </div>
  );
}
export default Deaths;
