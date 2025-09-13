import React, { useState, useEffect } from 'react';
import './AddBirth.css';
export const AddBirth = (props) => {
  const token = localStorage.getItem('zapmanejo_token');
  const url = '/api/data/births';
  const submit = (formData) => {
    const tag   = Number(formData.get("tag"));
    const breed = formData.get("breed");
    const sex   = formData.get("sex");
    const area  = formData.get("area");
    const date  = formData.get("date");
    fetch(url, {
      method: 'POST',
      headers: {
        "Authorization":`Bearer ${token}`,
        "Content-Type":"application/json"
      },
      body: JSON.stringify({tag, breed, sex, area, date})
    })
    .then(response => {
      props.onSuccess();
    })
    .catch(error => {
      console.error('Error updating form data:', error);
    });
  }

  return (
    <form className="AddBirth" action={submit}>
      <h3>Add Birth</h3>
      <input type="number" name="tag" placeholder="Tag Number" required/>

      <select name="breed">
        <option value="angus">Angus</option>
        <option value="nalore">Nalore</option>
        <option value="brangus">Brangus</option>
        <option value="sta_zelia">Sta Zelia</option>
        <option value="cruzado">Cruzado</option>
      </select>

      <select name="sex">
        <option value="m">Male</option>
        <option value="f">Female</option>
      </select>

      {/* @todo: Load Areas from Server and provide dropdown */}
      <input type="text" name="area" placeholder="area" required/>
      <input type="date" name="date" required/>
      <button type="submit">Add</button>
    </form>
  );
}
export default AddBirth;
