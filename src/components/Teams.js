import React, { useState } from 'react';
import ListTeams from './ListTeams.js';
import AddTeam from './AddTeam.js';
import Upload from './Upload.js';
import { ListButton, AddButton, UploadButton, DownloadButton } from './ActionButtons';

export const Team = () => {
  const [screen, setScreen] = useState("list");

  return (
    <>
      <div class="content-header">
        <div class="action-buttons">
          <ListButton 
            isActive={screen === "list"}
            onClick={() => setScreen("list")}
          />
          <AddButton 
            isActive={screen === "add"}
            onClick={() => setScreen("add")}
          />
          <UploadButton 
            isActive={screen === "upload"}
            onClick={() => setScreen("upload")}
          />
          <DownloadButton collection="teams"/>
        </div>
      </div>

      {(screen === "list") && <ListTeams/>}
      {(screen === "add") && 
        <AddTeam 
          onSuccess={() => setScreen("list")}
        />
      }
      {(screen === "upload") && 
        <Upload collection="teams"
          onSuccess={() => setScreen("list")}
        />
      }
    </>
  );
}

export default Team;
