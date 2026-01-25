import React, { useState } from 'react';
import ListProtocols from './ListProtocols.js';
import AddProtocol from './AddProtocol.js';
import Upload from '../../Upload.js';
import { ListButton, AddButton, UploadButton, DownloadButton } from '../../ActionButtons';

export const Protocols = () => {
  const [screen, setScreen] = useState("list");
  const collection = "reproduction-protocols";

  return (
    <>
      <div className="content-header">
        <div className="action-buttons">
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
          <DownloadButton collection={collection}/>
        </div>
      </div>

      {(screen === "list") && <ListProtocols/>}
      {(screen === "add") && 
        <AddProtocol
          onSuccess={() => setScreen("list")}
        />
      }
      {(screen === "upload") && 
        <Upload collection={collection}
          onSuccess={() => setScreen("list")}
        />
      }
    </>
  );
}

export default Protocols;
