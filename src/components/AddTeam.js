import React, { useState, useEffect } from 'react';
import './AddTeam.css';
export const AddTeam = (props) => {
  const token = localStorage.getItem('zapmanejo_token');
  const url = '/api/data/teams';
  const submit = (formData) => {
    const team_member_name = formData.get("team_member_name");
    const team_member_phone_number = formData.get("team_member_phone_number");
    fetch(url, {
      method: 'POST',
      headers: {
        "Authorization":`Bearer ${token}`,
        "Content-Type":"application/json"
      },
      body: JSON.stringify({ team_member_name, team_member_phone_number})
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
      <input type="text" name="team_member_name" 
        placeholder="Name" required/>
      <input type="text" name="team_member_phone_number" 
        placeholder="Phone Number" required/>
      <button type="submit">Add</button>
    </form>
  );
}
export default AddTeam;
