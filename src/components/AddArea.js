import React, { useState, useEffect } from 'react';
import './AddArea.css';
export const AddArea = (props) => {
  const token = localStorage.getItem('zapmanejo_token');
  const url = '/api/data/areas';
  const submit = (formData) => {
    const name = formData.get("name");
    const matches = `${name},${formData.get("matches")}`
    fetch(url, {
      method: 'POST',
      headers: {
        "Authorization":`Bearer ${token}`,
        "Content-Type":"application/json"
      },
      body: JSON.stringify({ name, matches })
    })
    .then(response => {
      props.onSuccess();
    })
    .catch(error => {
      console.error('Error updating form data:', error);
    });
  }

  return (
    <form className="AddArea" action={submit}>
      <h3>Add Area</h3>
      <input type="text" name="name" placeholder="Area" required/>
      <input type="text" name="matches" placeholder="Matches" required/>
      <button type="submit">Add</button>
    </form>
  );
}
export default AddArea;
