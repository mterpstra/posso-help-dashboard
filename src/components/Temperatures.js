import React, { useState } from 'react';
import ListTemperatures from './ListTemperatures.js';
import AddTemperature from './AddTemperature.js';
import Upload from './Upload.js';
import { ListButton, AddButton, UploadButton, DownloadButton } from './ActionButtons';

export const Temperature = () => {
  const [screen, setScreen] = useState("list");

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
          <DownloadButton collection="temperatures"/>
        </div>
      </div>

      {(screen === "list") && <ListTemperatures/>}
      {(screen === "add") && 
        <AddTemperature
          onSuccess={() => setScreen("list")}
        />
      }
      {(screen === "upload") && 
        <Upload collection="temperatures"
          onSuccess={() => setScreen("list")}
        />
      }
    </>
  );
}

export default Temperature;
