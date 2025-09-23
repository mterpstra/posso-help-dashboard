import React, { useState, useEffect } from 'react';
import './DataCollectionAdd.css';
export const AddDataCollection = (props) => {
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
      // @todo:  Check for error and token expiration
      props.onSuccess();
    })
    .catch(error => {
      console.error('Error updating form data:', error);
    });
  }
  return (
    <form class="DataCollectionAdd" action={submit}>
      <props.formElements/>
      <button type="submit">Add</button>
    </form>
  );
}
export default AddDataCollection;
