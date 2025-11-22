import './ContentHeader.css';
import { AddButton, UploadButton, DownloadButton }  from './Tab';
export const ContentHeader = (props) => {
  return (
    <div className="ContentHeader">
      <h2>{props.title}</h2>
      <div class="action-buttons">
        <AddButton collection={props.collection}/>
        <UploadButton collection={props.collection}/>
        <DownloadButton collection={props.collection}/>
      </div>
    </div>
  );
}
export default ContentHeader;
