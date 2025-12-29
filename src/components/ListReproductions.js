import React, { useState, useEffect } from 'react';
import DataCollection from './DataCollection';
import { useTranslation } from 'react-i18next';
import AddReproductionNote from './AddReproductionNote.js';
import ReproductionStatusDropdown from './ReproductionStatusDropdown.js';
import AnimalsProtocolStatus from './AnimalsProtocolStatus.js';
import DateInput from './DateInput.js';
import Patch from "./Patch.js";
import Notes from "./Notes.js";
import { Get } from './Get.js';
import { daysSince } from "./Utils.js";

export const ListReproductions = (props) => {


  const ExpandedProtocol = (props) => {

    for (const [index, protocol] of protocols.entries()) {
      if (props.data.protocol_id === protocol._id) {
        return (
          <AnimalsProtocolStatus
            protocol={protocol}
            animal={props.data}
          />
        );
      }
    }
  }


  const ExpandedComponent = ({ data }) => {

    return (
      <div>
        <h3>Protocol</h3>
        <ExpandedProtocol data={data}/>
        <h3>Notes</h3>
        <Notes 
          notes={data.notes || []}
          id={data._id}
        />
      </div>
    );
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

    /*
    {
      name: t("notes"),          
      selector: row => row.notes,   
      sortable: true
    },
     */
  ];


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
