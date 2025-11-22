import React, { useState } from 'react';
import ListTeams from './ListTeams.js';
import AddTeam from './AddTeam.js';
import Upload from './Upload.js';
import { ListButton, AddButton, UploadButton, DownloadButton } from './ActionButtons';

export const Team = () => {
  const [screen, setScreen] = useState("list");

  return (
    <>
      <div class="action-buttons">
        <ListButton onClick={() => setScreen("list")}/>
        <AddButton onClick={() => setScreen("add")}/>
        <UploadButton onClick={() => setScreen("upload")}/>
        <DownloadButton collection="teams"/>
      </div>
      <h2>
        Team 
      </h2>

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
