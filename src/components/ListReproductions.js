import React, { useState } from 'react';
import DataCollection from './DataCollection';
import { useTranslation } from 'react-i18next';
import AddReproductionNote from './AddReproductionNote.js';


export const ListReproductions = (props) => {

  const [screen, setScreen] = useState("list");
  const { t } = useTranslation();
  const collection = 'reproduction.active';

  const columns = [
    {name: t("tag"),            selector: row => row.tag,            sortable: true},
    {name: t("nickname"),       selector: row => row.nickname,       sortable: true},
    {name: t("protocol_id"),    selector: row => row.protocol_id,    sortable: true},
    {name: t("protocol_name"),  selector: row => row.protocol_name,  sortable: true},
    {name: t("start_date"),     selector: row => row.start_date,     sortable: true},
    {name: t("current_day"),    selector: row => row.current_day,    sortable: true},
    {name: t("predicted_iatf"), selector: row => row.predicted_iatf, sortable: true},
    {name: t("status"),         selector: row => row.status,         sortable: true},
    {name: t("notes"),          selector: row => Notes(row.notes),   sortable: true},
  ];

  const AddNote = (props) => {
    
    setScreen("add");
  }


  const Note = (props) => {
    return (
      <>
        <div>{props.item.created_by}</div>
        <div>{props.item.created_on}</div>
        <div>{props.item.note}</div>
      </>
    );
  }

  const Notes = (props) => {
    if (Array.isArray(props) === false) {
      return (
        <button onClick={AddNote}>
          Add
        </button>
      );
    }

    const notesList = props.map((item, index) => (
      <Note key={index} id={index} item={item}/>
    ));
    return (
      <div className="NoteList">
        {notesList}
      </div>
    );
  }

  if (screen === "add") { return ( <AddReproductionNote/>); }

  return (
    <div>
      <DataCollection 
        collection={collection} 
        columns={columns}
        onSelection={props.onSelection}
      />
    </div>
  );
}
export default ListReproductions;
