import React, { useState, useEffect } from 'react';
import './AddDeath.css';
export const AddDeath= (props) => {
  const token = localStorage.getItem('zapmanejo_token');
  const url = '/api/data/deaths';
  const submit = (formData) => {
    const tag   = Number(formData.get("tag"));
    const sex   = formData.get("sex");
    const cause = formData.get("cause");
    const area  = formData.get("area");
    const date  = formData.get("date");
    fetch(url, {
      method: 'POST',
      headers: {
        "Authorization":`Bearer ${token}`,
        "Content-Type":"application/json"
      },
      body: JSON.stringify({tag, sex, cause, area, date})
    })
    .then(response => {
      props.onSuccess();
    })
    .catch(error => {
      console.error('Error updating form data:', error);
    });
  }

  return (
    <form className="AddDeath" action={submit}>
      <h3>Add Death</h3>
      <input type="number" name="tag" placeholder="Tag Number" required/>
      <select name="sex">
        <option value="m">Male</option>
        <option value="f">Female</option>
      </select>
      <select name="cause">
        <option value="aborto">Aborto</option>
        <option value="other">Other</option>
      </select>
      {/* @todo: Load Areas from Server and provide dropdown */}
      <input type="text" name="area" placeholder="area" required/>
      <input type="date" name="date" required/>
      <button type="submit">Add</button>
    </form>
  );
}
export default AddDeath;
