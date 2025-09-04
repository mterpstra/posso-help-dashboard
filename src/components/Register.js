import React, { useState } from 'react';
import ErrorMessage from './ErrorMessage';
import './Register.css';
const Register = (props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const submit = (formData) => {
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const phone_number = formData.get("phone_number");

    fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({username, email, phone_number, password})
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.success) {
        props.onRegisterSuccessfull(data);
      } else {
        setErrorMessage(data.message);
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  return (
    <form className="RegisterForm" action={submit}>
      <h2>Register</h2>
      <input name="username" type="text" placeholder="Username"/>
      <input name="email" type="text" placeholder="Email"/>
      <input name="phone_number" 
             type="tel" placeholder="WhatsApp (opcional): +5511999999999"/>
      <input name="password" type="password" placeholder="Password"/>
      <input type="password" placeholder="Confirm Password"/>
      <button type="submit">Register</button>
      <ErrorMessage message={errorMessage}/>
      <div className="success-message">Success</div>
      <div className="links">
        <a href="#" onClick={props.onLoginClick}>Login</a>
      </div>
    </form>
  );
}
export default Register;
