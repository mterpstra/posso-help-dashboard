import React, { useState, useEffect } from 'react';
import ErrorMessage from './ErrorMessage.js';
import './Login.css';
const Login = (props) => {

  const [errorMessage, setErrorMessage] = useState("");
  const submit = (formData) => {
    const email = formData.get("email");
    const password = formData.get("password");
    console.log("in submit", email, password);

    fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({email, password})
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Login success:', data);
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
    <form className="LoginForm" action={submit}>
      <h2>Login</h2>
      <input type="email"    name="email" placeholder="Email" required/>
      <input type="password" name="password" placeholder="Password" required/>
      <button type="submit">Login</button>
      <ErrorMessage message={errorMessage}/>
      <div className="links">
        <a href="#" onClick={props.onRegisterClick}>Register</a>
        <a href="#" onClick={props.onForgotPasswordClick}>Forgot Password</a>
      </div>
    </form>
  );
}

export default Login;
