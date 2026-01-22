import DataTable from 'react-data-table-component';
import React, { useState, useEffect } from 'react';
import DeleteButton from './DeleteButton.js';

export const DataCollection = (props) => {
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState(false);
  const [toggledClearRows, setToggleClearRows] = useState(false);

  const handleChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
  };

  const handleDeleteComplete = () => {
    setSelectedRows([]);
    setToggleClearRows(false);
    setRefresh(!refresh);
  }

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
          if (response.status === 401) {
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
  }, [refresh,props.collection]);

  return (
    <div>
      <h2>{props.title}</h2>
      <DataTable
        pagination
        defaultSortFieldId={1}
        data={data}
        columns={props.columns}
        selectableRows
        onSelectedRowsChange={handleChange}
        clearSelectedRows={toggledClearRows}
        expandableRows={props.expandableRows}
        expandableRowsComponent={props.expandableRowsComponent}
      />
      <DeleteButton 
        onComplete={handleDeleteComplete}
        collection={props.collection} 
        data={selectedRows}/> 
    </div>
  );
}
export default DataCollection;
