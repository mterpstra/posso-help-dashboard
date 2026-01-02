import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import "./ListReproductions.css";
import DataCollection from './DataCollection';
import AddReproductionNote from './AddReproductionNote.js';
import ReproductionStatusDropdown from './ReproductionStatusDropdown.js';
import AnimalsProtocolStatus from './AnimalsProtocolStatus.js';
import DateInput from './DateInput.js';
import Patch from "./Patch.js";
import Notes from "./Notes.js";
import { Get } from './Get.js';
import { daysSince } from "./Utils.js";

export const ListReproductions = (props) => {

  const [showProtocol, setShowProtocol] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [protocols, setProtocols] = useState(null);
  const { t } = useTranslation();
  const collection = 'reproduction.active';

  useEffect(() => {
    Get('reproduction.protocols', 
      (data) => {setProtocols(data)});
  }, []);

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
      <div className="ExpandedComponent">
        {showProtocol && 
          <h4 onClick={()=>setShowProtocol(!showProtocol)}>
            {t("hide-protocol-view")}
          </h4>
        }
        {!showProtocol && 
          <h4 onClick={()=>setShowProtocol(!showProtocol)}>
            {t("show-protocol-view")}
          </h4>
        }
        {showProtocol && <ExpandedProtocol data={data}/>}

        {showNotes && 
          <h4 onClick={()=>setShowNotes(!showNotes)}>
            {t("hide-notes-view")}
          </h4>
        }
        {!showNotes && 
          <h4 onClick={()=>setShowNotes(!showNotes)}>
            {t("show-notes-view")}
          </h4>
        }
        {showNotes && <Notes notes={data.notes || []} id={data._id} />}
      </div>
    );
  }

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
