import DataTable from 'react-data-table-component';
import React, { useState, useEffect } from 'react';

export const DataCollection = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('zapmanejo_token');
    const url = `/api/data/${props.collection}`;
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
          if (response.status == 401) {
            localStorage.removeItem('zapmanejo_token');
            localStorage.removeItem('zapmanejo_user');
            window.location.reload();
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2>{props.title}</h2>
      <DataTable
        data={data}
        columns={props.columns}
      />
    </div>
  );
}
export default DataCollection;
