import React, { useState } from 'react';
import ListDeaths from './ListDeaths.js';
import AddDeath from './AddDeath.js';
import Upload from './Upload.js';
import { ListButton, AddButton, UploadButton, DownloadButton } from './ActionButtons';

export const Death = () => {
  const [screen, setScreen] = useState("list");

  return (
    <>
      <div className="content-header">
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
