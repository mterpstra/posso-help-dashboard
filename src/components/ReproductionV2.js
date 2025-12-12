import React, { useState } from 'react';
import ListReproductions from './ListReproductions.js';
import DataCollectionAdd, { DataCollectionEdit } from './DataCollectionAdd.js';
import Upload from './Upload.js';
import Download from './Download.js';
import { ActionButtons } from './ActionButtons';

import TagNumberInput from './TagNumberInput.js';
import ProtocolDropdown from './ProtocolDropdown.js';
import ReproductionStatusDropdown from './ReproductionStatusDropdown.js';
import DateInput from './DateInput.js';

export const ReproductionV2 = () => {

  const getBodyFromForm = (formData, row) => {
    console.log("reproduction row edit", row);
    const tag = Number(formData.get("tag"));
    const nickname = formData.get("nickname");
    const protocol_name = formData.get("protocol_name");
    const start_date  = formData.get("start_date");
    const predicted_iatf = formData.get("predicted_iatf");
    const status = formData.get("status");
    return {
      tag, nickname, protocol_name, 
      start_date, predicted_iatf, status,
    };
  }

  const ReproductionForm = (props) => {
    console.log("ReproductionForm", props);
    const [tag, setTag] = useState(props.tag);
    const [nickname, setNickname] = useState(props.nickname);
    const [protocol, setProtocol] = useState(props.protocol_name);
    return (
      <>

        <TagNumberInput 
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />

        <input 
          name="nickname" placeholder="Nickname" 
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />

        <ProtocolDropdown 
          value={protocol}
        />

        <DateInput 
          name="start_date" 
          prompt="Start Date" 
          value={props.state_date} 
        />

        <DateInput 
          name="predicted_iatf" 
          prompt="Predicted IATF Date" 
          value={props.predicted_iatf} 
        />

        <ReproductionStatusDropdown name="status" />
      </>
    );
  }

  const [screen, setScreen] = useState("list");
  const [editRow, setEditRow] = useState({});
  const selection = (rows) => {
    console.log("selection made", rows);
    if (rows.length === 1) {
      setEditRow(rows[0]);
    } else {
      setEditRow(null);
    }
  }

  return (
    <>
      <div class="content-header">
        <ActionButtons
          row={editRow}
          onClick={(action) => {
            setScreen(action);
          }}
        />
      </div>

      {(screen === "list") && 
        <ListReproductions
          onSelection={selection}
        />
      }

      {(screen === "upload") && 
        <Upload collection="reproduction.action"
          onSuccess={() => setScreen("list")}
        />
      }

      {(screen === "download") && 
        <Download collection="reproduction.action"
          onSuccess={() => setScreen("list")}
        />
      }

      {(screen === "add") && 
        <DataCollectionAdd
          collection="reproduction.active"
          getBodyFromForm={getBodyFromForm}
          formElements={ReproductionForm}
          onSuccess={() => setScreen("list")}
          duplicateMsg="Reproduction with that tag already exists."
        />
      }

      {(screen === "edit") && 
        <DataCollectionEdit
          row={editRow}
          collection="reproduction.active"
          getBodyFromForm={getBodyFromForm}
          formElements={ReproductionForm}
          onSuccess={() => setScreen("list")}
          duplicateMsg="should never happen"
        />
      }
    </>
  );
}

export default ReproductionV2;
