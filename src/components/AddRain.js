import React, { useState, useEffect } from 'react';
import './AddRain.css';
export const AddRain = (props) => {
  const token = localStorage.getItem('zapmanejo_token');
  const url = '/api/data/rain';
  const submit = (formData) => {
    const amount = Number(formData.get("amount"));
    const area  = formData.get("area");
    const date  = formData.get("date");
    fetch(url, {
      method: 'POST',
      headers: {
        "Authorization":`Bearer ${token}`,
        "Content-Type":"application/json"
      },
      body: JSON.stringify({amount, area, date})
    })
    .then(response => {
      props.onSuccess();
    })
    .catch(error => {
      console.error('Error updating form data:', error);
    });
  }

  return (
    <form className="AddRain" action={submit}>
      <h3>Add Rain</h3>
      <input type="number" name="amount" placeholder="Rainfall" required/>
      {/* @todo: Load Areas from Server and provide dropdown */}
      <input type="text" name="area" placeholder="area" required/>
      <input type="date" name="date" required/>
      <button type="submit">Add</button>
    </form>
  );
}
export default AddRain;
