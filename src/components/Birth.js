import React, { useState } from 'react';
import ListBirths from './ListBirths.js';
import AddBirth from './AddBirth.js';
import Upload from './Upload.js';
import { ListButton, AddButton, UploadButton, DownloadButton } from './ActionButtons';

export const Birth = () => {
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
          <DownloadButton collection="births"/>
        </div>
      </div>

      {(screen === "list") && <ListBirths/>}
      {(screen === "add") && 
        <AddBirth 
          onSuccess={() => setScreen("list")}
        />
      }
      {(screen === "upload") && 
        <Upload collection="births"
          onSuccess={() => setScreen("list")}
        />
      }
    </>
  );
}

export default Birth;
