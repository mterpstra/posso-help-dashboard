import React, { useState } from 'react';
import ListDeaths from './ListDeaths.js';
import AddDeath from './AddDeath.js';
import Upload from './Upload.js';
import { ListButton, AddButton, UploadButton, DownloadButton } from './ActionButtons';

export const Death = () => {
  const [screen, setScreen] = useState("list");

  return (
    <>
      <div class="content-header">
        <h2>{screen} Deaths</h2>
        <div class="action-buttons">
          <ListButton onClick={() => setScreen("list")}/>
          <AddButton onClick={() => setScreen("add")}/>
          <UploadButton onClick={() => setScreen("upload")}/>
          <DownloadButton collection="deaths"/>
        </div>
      </div>

      {(screen === "list") && <ListDeaths/>}

      {(screen === "add") && 
        <AddDeath 
          onSuccess={() => setScreen("list")}
        />
      }


      {(screen === "upload") && 
        <Upload collection="deaths"
          onSuccess={() => setScreen("list")}
        />
      }
    </>
  );
}

export default Death;
