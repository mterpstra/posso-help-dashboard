import React, { useState } from 'react';
import ListAreas from './ListAreas.js';
import AddArea from './AddArea.js';
import Upload from './Upload.js';
import { ListButton, AddButton, UploadButton, DownloadButton } from './ActionButtons';

export const Areas = () => {
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
          <DownloadButton collection="areas"/>
        </div>
      </div>

      {(screen === "list") && <ListAreas/>}
      {(screen === "add") && 
        <AddArea
          onSuccess={() => setScreen("list")}
        />
      }
      {(screen === "upload") && 
        <Upload collection="areas"
          onSuccess={() => setScreen("list")}
        />
      }
    </>
  );
}

export default Areas;
