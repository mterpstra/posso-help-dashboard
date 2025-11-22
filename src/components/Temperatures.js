import React, { useState } from 'react';
import ListTemperatures from './ListTemperatures.js';
import AddTemperature from './AddTemperature.js';
import Upload from './Upload.js';
import { ListButton, AddButton, UploadButton, DownloadButton } from './ActionButtons';
import { useTranslation } from 'react-i18next';

export const Temperature = () => {
  const { t } = useTranslation();
  const [screen, setScreen] = useState("list");

  return (
    <>
      <div class="action-buttons">
        <ListButton onClick={() => setScreen("list")}/>
        <AddButton onClick={() => setScreen("add")}/>
        <UploadButton onClick={() => setScreen("upload")}/>
        <DownloadButton collection="temperatures"/>
      </div>
      <h2>
        {screen} Temperatures
      </h2>

      {(screen == "list") && <ListTemperatures/>}

      {(screen == "add") && 
        <AddTemperature
          onSuccess={() => setScreen("list")}
        />
      }


      {(screen == "upload") && 
        <Upload collection="temperatures"
          onSuccess={() => setScreen("list")}
        />
      }
    </>
  );
}

export default Temperature;
