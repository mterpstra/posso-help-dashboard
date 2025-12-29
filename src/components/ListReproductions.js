import React, { useState, useEffect } from 'react';
import DataCollection from './DataCollection';
import { useTranslation } from 'react-i18next';
import AddReproductionNote from './AddReproductionNote.js';
import ReproductionStatusDropdown from './ReproductionStatusDropdown.js';
import AnimalsProtocolStatus from './AnimalsProtocolStatus.js';
import DateInput from './DateInput.js';
import Patch from "./Patch.js";
import { Get } from './Get.js';
import { daysSince } from "./Utils.js";

export const ListReproductions = (props) => {

  const ExpandedComponent = ({ data }) => {
    for (const [index, protocol] of protocols.entries()) {
      if (data.protocol_id === protocol._id) {
        return (
          <AnimalsProtocolStatus
            protocol={protocol}
            animal={data}
          />
        );
      }
    }
  }

  const [screen, setScreen] = useState("list");
  const [protocols, setProtocols] = useState(null);
  const { t } = useTranslation();
  const collection = 'reproduction.active';

  useEffect(() => {
    Get('reproduction.protocols', 
      (data) => {setProtocols(data)});
  }, []);

  const columns = [
    {
      name: t("tag"),
      selector: row => row.tag,
      sortable: true
    },

    {
      name: t("nickname"),
      selector: row => row.nickname,
      sortable: true,
    },

    {
      name: t("protocol_name"),
      selector: row => row.protocol_name,
      sortable: true
    },

    {
      name: t("start_date"),
      selector: row => row.start_date,
      sortable: true,
      cell: row => <DateInput
        date={row.start_date}
        onChange={(value) => {
          console.log("parent on change", value);
          Patch("reproduction.active", row._id, "start_date", value,
            () => {console.log("success")},
            () => {console.log("error")},
          );
        }}
      />
    },

    {
      name: t("current_day"),    
      selector: row => row.current_day,    
      sortable: true,
      format: row => daysSince(row.start_date),
    },

    {
      name: t("predicted_iatf"), 
      selector: row => row.predicted_iatf, 
      sortable: true,
      cell: row => <DateInput
        date={row.predicted_iatf}
        onChange={(value) => {
          console.log("parent on change", value);
          Patch("reproduction.active", row._id, "predicted_iatf", value,
            () => {console.log("success")},
            () => {console.log("error")},
          );
        }}
      />
    },


    {
      name: t("status"),         
      selector: row => row.status,         
      sortable: true,
      cell: row => <ReproductionStatusDropdown
        selected={row.status}
        onChange={(e) => {
          Patch(collection, row._id, "status", e.target.value,
            () => {console.log("success")},
            () => { console.log("error")},
          );
        }}
      />
    },

    {
      name: t("notes"),          
      selector: row => Notes(row.notes),   
      sortable: true
    },
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
        expandableRows 
        expandableRowsComponent={ExpandedComponent}
      />
    </div>
  );
}
export default ListReproductions;
