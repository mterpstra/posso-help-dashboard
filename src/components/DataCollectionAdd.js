import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ErrorMessage from './ErrorMessage.js';
import './DataCollectionAdd.css';
export const AddDataCollection = (props) => {
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem('zapmanejo_token');
  const url = `/api/data/${props.collection}`;
  const submit = (formData) => {
    const body = props.getBodyFromForm(formData);
    return;
    fetch(url, {
      method: 'POST',
      headers: {
        "Authorization":`Bearer ${token}`,
        "Content-Type":"application/json"
      },
      body: body,
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
    .then(data => {
      if (data.trim() === "duplicate_key_error") {
        setErrorMessage(props.duplicateMsg);
      } else {
        setErrorMessage(`Error: ${props.collection}`);
      }
    })
    .catch(error => {
      console.error('Error updating form data:', error);
    });
  }
  return (
    <form class="DataCollectionAdd" action={submit}>
      <props.formElements/>
      <button type="submit">{t("add_button")}</button>
      <ErrorMessage message={errorMessage}/>
    </form>
  );
}
export default AddDataCollection;
