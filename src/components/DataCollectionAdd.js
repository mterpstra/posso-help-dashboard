import React, { useState, useEffect } from 'react';
import ErrorMessage from './ErrorMessage.js';
import './DataCollectionAdd.css';
export const AddDataCollection = (props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem('zapmanejo_token');
  const url = `/api/data/${props.collection}`;
  const submit = (formData) => {
    const body = props.getBodyFromForm(formData);
    fetch(url, {
      method: 'POST',
      headers: {
        "Authorization":`Bearer ${token}`,
        "Content-Type":"application/json"
      },
      body: body,
    })
    .then(response => {
      if (!response.ok) {
        if (response.status == 401) {
          localStorage.removeItem('zapmanejo_token');
          localStorage.removeItem('zapmanejo_user');
          window.location.reload();
        }
        let errorBody = response.text();
        if (errorBody == "") {
          errorBody = `Error adding to ${props.collection}`; 
        }
        setErrorMessage(errorBody);
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        props.onSuccess();
      }
    })
    .catch(error => {
      console.error('Error updating form data:', error);
    });
  }
  return (
    <form class="DataCollectionAdd" action={submit}>
      <props.formElements/>
      <button type="submit">Add</button>
      <ErrorMessage message={errorMessage}/>
    </form>
  );
}
export default AddDataCollection;
