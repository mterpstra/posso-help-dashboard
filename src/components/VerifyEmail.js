import React, { useState, useEffect } from 'react';
import ErrorMessage from './ErrorMessage.js';
import './VerifyEmail.css';
const VerifyEmail = (props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const submit = (formData) => {
    const code = formData.get("code");
    const email = formData.get("email");
    console.log("in submit", code, email);

    fetch('/api/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify({code, email})
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.success) {
        localStorage.setItem('zapmanejo_token', data.token);
        localStorage.setItem('zapmanejo_user', JSON.stringify(data.user));
        window.location.reload();
      } else {
        setErrorMessage(data.message);
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  return (
    <form className="VerifyEmailForm" action={submit}>
      <h2>Enter verification code</h2>
      <p>We sent an email to: {props.email}</p>
      <input type="text" name="code" placeholder="Enter Code" maxLength="6"/>
      <input type="text" name="email" hidden value={props.email}/>
      <button type="submit">Submit</button>
      <ErrorMessage message={errorMessage}/>
      <div className="links">
        <a href="#" onClick={props.onLoginClick}>Login</a>
      </div>
    </form>
  );
}

export default VerifyEmail;
