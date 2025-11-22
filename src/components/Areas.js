import React, { useState } from 'react';
import ListAreas from './ListAreas.js';
import AddArea from './AddArea.js';
import Upload from './Upload.js';
import { ListButton, AddButton, UploadButton, DownloadButton } from './ActionButtons';
import { useTranslation } from 'react-i18next';

export const Areas = () => {
  const { t } = useTranslation();
  const [screen, setScreen] = useState("list");

  return (
    <>
      <div class="action-buttons">
        <ListButton onClick={() => setScreen("list")}/>
        <AddButton onClick={() => setScreen("add")}/>
        <UploadButton onClick={() => setScreen("upload")}/>
        <DownloadButton collection="areas"/>
      </div>
      <h2>
        Areas
      </h2>

      {(screen == "list") && <ListAreas/>}

      {(screen == "add") && 
        <AddArea
          onSuccess={() => setScreen("list")}
        />
      }


      {(screen == "upload") && 
        <Upload collection="areas"
          onSuccess={() => setScreen("list")}
        />
      }
    </>
  );
}

export default Areas;
