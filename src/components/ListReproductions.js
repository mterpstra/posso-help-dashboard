import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import "./ListReproductions.css";
import DataCollection from './DataCollection';
import AddReproductionNote from './AddReproductionNote.js';
import ReproductionStatus from './ReproductionStatus.js';
import AnimalsProtocolStatus from './AnimalsProtocolStatus.js';
import ReproductionResultDropdown from './ReproductionResultDropdown.js';
import DateInput from './DateInput.js';
import Patch from "./Patch.js";
import Notes from "./Notes.js";
import { Get } from './Get.js';
import { daysSince } from "./Utils.js";

export const ListReproductions = (props) => {

  const [refreshKey, setRefreshKey] = useState(0)
  const [protocols, setProtocols] = useState(null);
  const { t } = useTranslation();
  const collection = 'reproduction.active';

  useEffect(() => {
    Get('reproduction.protocols', 
      (data) => {setProtocols(data)});
  }, []);

  const ExpandedProtocol = (props) => {
    const protocol = GetProtocolFromId(props.data.protocol_id);
    return (
      <AnimalsProtocolStatus
        protocol={protocol}
        animal={props.data}
        onUpdate={() => 
          console.log("Something in Animal Protocol Status changed")
        }
      />
    );
  }

  const GetProtocolFromId = (id) => {
    for (const [index, protocol] of protocols.entries()) {
      if (id === protocol._id) {
        return protocol;
      }
    }
    return null;
  }

  const GetTotalDaysForProtocol = (protocol) => {
    let total_days = 0;
    for (const timeline of protocol.timeline_days) {
      if (timeline.end_day > total_days) {
        total_days = timeline.end_day;
      }
    }
    return total_days;
  }

  const ExpandedComponent = ({ data }) => {
    const [showProtocol, setShowProtocol] = useState(false);
    const [showNotes, setShowNotes] = useState(false);
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
      selector: row => { 
        const protocol = GetProtocolFromId(row.protocol_id);
        const days = GetTotalDaysForProtocol(protocol);
        const dt = new Date(row.start_date + "T10:00:00Z");
        dt.setDate(dt.getDate() + days);
        const iatf_date = dt.toISOString().split('T')[0];
        return iatf_date;
      },
      sortable: true,
    },

    {
      name: t("status"),         
      selector: row => row.status,         
      sortable: true,
      cell: row => <ReproductionStatus
        animal={row}
        protocol={GetProtocolFromId(row.protocol_id)}
      />
    },

    {
      name: t("result"),         
      selector: row => row.result,         
      sortable: true,
      cell: row => <ReproductionResultDropdown
        result={row.result}
        onChange={(value) => {
          Patch("reproduction.active", row._id, 
            "result", value.currentTarget.value,
            () => {
              console.log("setting refresh key")
              setRefreshKey(refreshKey => refreshKey + 1);
            },
            () => {
              console.log("error")
            },
          )
        }}
      />,
    },
  ];


  if (protocols === null) {
    return (
      <>
        Loading...
      </>
    );
  }

  return (
    <div>
      <DataCollection 
        collection={collection} 
        columns={columns}
        key={refreshKey}
        onSelection={props.onSelection}
        expandableRows 
        expandableRowsComponent={ExpandedComponent}
      />
    </div>
  );
}
export default ListReproductions;
