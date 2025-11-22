import { useTranslation } from 'react-i18next';
import './Upload.css';

export const Upload = (props) => {
  const { t } = useTranslation();
  const url = `/api/upload/${props.collection}`;
  const token = localStorage.getItem('zapmanejo_token');
  const submit = (formData) => {
    fetch(url, {
      method: 'POST',
      headers: {
        "Authorization":`Bearer ${token}`,
        "enctype":"multipart/form-data",
      },
      body: formData,
    })
    .then(response => {
      if (response.ok) {
        props.onSuccess();
        return response.json();
      }
      if (response.status === 401) {
        localStorage.removeItem('zapmanejo_token');
        localStorage.removeItem('zapmanejo_user');
        window.location.reload();
      }
      return response.text();
    })
    .catch(error => {
      console.error('Error updating form data:', error);
    });
  }

  return (
    <div className="UploadForm">
      <form action={submit}
            method="post" enctype="multipart/form-data">
        <label for="csvFile">Choose a CSV file:</label>
        <input type="file" id="csvFile" 
               name="csvFile" accept=".csv, text/csv" required/>
        <button type="submit" value="Upload File">Upload</button>
      </form>
    </div>
  );
}

export default Upload;
