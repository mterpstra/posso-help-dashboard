import DataTable from 'react-data-table-component';
import React, { useState, useEffect } from 'react';
import DeleteButton from './DeleteButton.js';
import { Fetch } from './Utils.js';

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
    Fetch(`/api/data/${props.collection}`, "GET",  null,
      (data) => {
        setData(data);
      });
  }, [refresh,props.collection]);

  const isRowDisabled = row => row.account === "000000000000000000000000";

  return (
    <div>
      <h2>{props.title}</h2>
      <DataTable
        pagination
        defaultSortFieldId={1}
        data={data}
        columns={props.columns}
        selectableRows
        selectableRowDisabled={isRowDisabled}
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
