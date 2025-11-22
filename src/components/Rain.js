import React, { useState } from 'react';
import ListRain from './ListRain.js';
import AddRain from './AddRain.js';
import Upload from './Upload.js';
import { ListButton, AddButton, UploadButton, DownloadButton } from './ActionButtons';

export const Rain = () => {
  const [screen, setScreen] = useState("list");

  return (
    <>
      <div class="content-header">
        <h2>{screen} Rain</h2>
        <div class="action-buttons">
          <ListButton onClick={() => setScreen("list")}/>
          <AddButton onClick={() => setScreen("add")}/>
          <UploadButton onClick={() => setScreen("upload")}/>
          <DownloadButton collection="rain"/>
        </div>
      </div>

      {(screen === "list") && <ListRain/>}

      {(screen === "add") && 
        <AddRain
          onSuccess={() => setScreen("list")}
        />
      }


      {(screen === "upload") && 
        <Upload collection="rain"
          onSuccess={() => setScreen("list")}
        />
      }
    </>
  );
}

export default Rain;
