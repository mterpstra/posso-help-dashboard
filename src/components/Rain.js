import React, { useState } from 'react';
import ListRain from './ListRain.js';
import AddRain from './AddRain.js';
import Upload from './Upload.js';
import { ListButton, AddButton, UploadButton, DownloadButton } from './ActionButtons';
import { useTranslation } from 'react-i18next';

export const Rain = () => {
  const { t } = useTranslation();
  const [screen, setScreen] = useState("list");

  return (
    <>
      <div class="action-buttons">
        <ListButton onClick={() => setScreen("list")}/>
        <AddButton onClick={() => setScreen("add")}/>
        <UploadButton onClick={() => setScreen("upload")}/>
        <DownloadButton collection="rain"/>
      </div>
      <h2>
        {screen} Rain
      </h2>

      {(screen == "list") && <ListRain/>}

      {(screen == "add") && 
        <AddRain
          onSuccess={() => setScreen("list")}
        />
      }


      {(screen == "upload") && 
        <Upload collection="rain"
          onSuccess={() => setScreen("list")}
        />
      }
    </>
  );
}

export default Rain;
