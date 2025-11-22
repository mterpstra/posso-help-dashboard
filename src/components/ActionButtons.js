import './ActionButtons.css';

const ActionButton = (props) => {
  const classes = `ActionButton ${props.className}`;
  return ( 
    <button 
      className={classes}
      onClick={props.onClick}>
      {props.label}
    </button>
  );
}

export const ListButton = (props) => {
  return ( 
    <ActionButton 
      className="ListButton" 
      label="&#9776;"
      onClick={props.onClick}
    />
  );
}

export const AddButton = (props) => {
  return ( 
    <ActionButton 
      className="AddButton" 
      label="+"
      onClick={props.onClick}
    />
  );
}

export const UploadButton = (props) => {
  return ( 
    <ActionButton 
      className="UploadButton" 
      label="&#8682;"
      onClick={props.onClick}
    />
  );
}

export const DownloadButton = (props) => {
  const token = localStorage.getItem('zapmanejo_token');
  const url = `http://localhost:8080/api/download/${props.collection}?token=${token}`
  return ( 
    <a href={url} target="_blank" download>
      <ActionButton 
        className="DownloadButton" 
        label="&#8679;"
        onClick={props.onClick}
      />
    </a>
  );
}

