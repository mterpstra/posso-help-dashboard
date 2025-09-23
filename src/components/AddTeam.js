import React, { useState, useEffect } from 'react';
import './AddTeam.css';
export const AddTeam = (props) => {
  const token = localStorage.getItem('zapmanejo_token');
  const url = '/api/data/teams';
  const submit = (formData) => {
    const name = formData.get("name");
    const phone_number = formData.get("phone_number");
    fetch(url, {
      method: 'POST',
      headers: {
        "Authorization":`Bearer ${token}`,
        "Content-Type":"application/json"
      },
      body: JSON.stringify({ name, phone_number})
    })
    .then(response => {
      props.onSuccess();
    })
    .catch(error => {
      console.error('Error updating form data:', error);
    });
  }

  return (
    <form className="AddTeam" action={submit}>
      <h3>Add Team Member</h3>
      <input type="text" name="name" placeholder="Name" required/>
      <input type="text" name="phone_number" placeholder="Phone Number" required/>
      <button type="submit">Add</button>
    </form>
  );
}
export default AddTeam;
