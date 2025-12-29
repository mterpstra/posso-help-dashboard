import React, { useState } from 'react';
import ListReproductions from './ListReproductions.js';
import DataCollectionAdd from './DataCollectionAdd.js';
import Upload from './Upload.js';
import { ListButton, AddButton, UploadButton, DownloadButton } from './ActionButtons';

import TagNumberInput from './TagNumberInput.js';
import ProtocolDropdown from './ProtocolDropdown.js';
import ReproductionStatusDropdown from './ReproductionStatusDropdown.js';
import DateInput from './DateInput.js';

export const ReproductionV2 = () => {

  const getBodyFromForm = (formData, row) => {
    console.log("reproduction row edit", row);
    const tag = Number(formData.get("tag"));
    const nickname = formData.get("nickname");
    
    const protocol = formData.get("protocol").split("::", 2);
    const protocol_id = protocol[0];
    const protocol_name = protocol[1];

    const start_date  = formData.get("start_date");
    const predicted_iatf = formData.get("predicted_iatf");
    const status = formData.get("status");
    return JSON.stringify({
      tag, nickname, protocol_id, protocol_name,
      start_date, predicted_iatf, status,
    });
  }

  const ReproductionForm = (props) => {
    const [tag, setTag] = useState(props.tag);
    const [nickname, setNickname] = useState(props.nickname);
    const [protocol, setProtocol] = useState(props.protocol_name);
    return (
      <>

        <TagNumberInput 
          value={tag}
          edit={true}
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

        <div>Start Date</div>
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
        <div class="action-buttons">
          <ListButton 
            isActive={screen=="list"}
            onClick={() => setScreen("list")}
          />
          <AddButton 
            isActive={screen=="add"}
            onClick={() => setScreen("add")}
          />
          <UploadButton 
            isActive={screen=="upload"}
            onClick={() => setScreen("upload")}
          />
          <DownloadButton collection="reproduction.active"/>
        </div>
      </div>

      {(screen === "list") && 
        <ListReproductions
          onSelection={selection}
        />
      }

      {(screen === "upload") && 
        <Upload collection="reproduction.active"
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

    </>
  );
}

export default ReproductionV2;
