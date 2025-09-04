import React, { useState, useEffect } from 'react';
import './AddPhoneNumber.css';
export const AddPhoneNumber = (props) => {
  const token = localStorage.getItem('zapmanejo_token');
  const url = '/api/user/phonenumber';
  const submit = (formData) => {
    const phone_number= formData.get("phone_number");
    fetch(url, {
      method: 'POST',
      headers: {
        "Authorization":`Bearer ${token}`,
        "Content-Type":"application/json"
      },
      body: JSON.stringify({phone_number})
    })
    .then(response => {
      props.onSuccess();
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  return (
    <form className="AddPhoneNumber" action={submit}>
      <h3>Add Phone Number</h3>
      <input type="text" name="phone_number" placeholder="Phone Number" required/>
      <button type="submit">Add</button>
    </form>
  );
}
export default AddPhoneNumber;
