import React, { useState } from 'react';
import ListBirths from './ListBirths.js';
import AddBirth from './AddBirth.js';
import Upload from './Upload.js';
import { ListButton, AddButton, UploadButton, DownloadButton } from './ActionButtons';

export const Birth = () => {
  const [screen, setScreen] = useState("list");

  return (
    <>
      <div class="action-buttons">
        <ListButton onClick={() => setScreen("list")}/>
        <AddButton onClick={() => setScreen("add")}/>
        <UploadButton onClick={() => setScreen("upload")}/>
        <DownloadButton collection="births"/>
      </div>
      <h2>
        {screen} Births
      </h2>

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
