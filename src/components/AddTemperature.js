import React, { useState, useEffect } from 'react';
import './AddTemperature.css';
export const AddTemperature = (props) => {
  const token = localStorage.getItem('zapmanejo_token');
  const url = '/api/data/temperature';
  const submit = (formData) => {
    const temperature = Number(formData.get("temperature"));
    const area  = formData.get("area");
    const date  = formData.get("date");
    fetch(url, {
      method: 'POST',
      headers: {
        "Authorization":`Bearer ${token}`,
        "Content-Type":"application/json"
      },
      body: JSON.stringify({temperature, area, date})
    })
    .then(response => {
      props.onSuccess();
    })
    .catch(error => {
      console.error('Error updating form data:', error);
    });
  }

  return (
    <form className="AddTemperature" action={submit}>
      <h3>Add Temperature</h3>
      <input type="number" name="temperature" placeholder="Temperature" required/>
      {/* @todo: Load Areas from Server and provide dropdown */}
      <input type="text" name="area" placeholder="area" required/>
      <input type="date" name="date" required/>
      <button type="submit">Add</button>
    </form>
  );
}
export default AddTemperature;
