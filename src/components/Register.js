import React, { useState } from 'react';
import ErrorMessage from './ErrorMessage';
import PhoneNumberInput from './PhoneNumberInput.js';
import './Register.css';
const Register = (props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");

  const passwordRequirements = "Password is too weak.  It must be contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character";
  const isValidPassword = (password) => {
    // Check minimum length
    if (password.length < 8) {
      return false;
    }
    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return false;
    }
    // Check for at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      return false;
    }
    // Check for at least one number
    if (!/\d/.test(password)) {
      return false;
    }
    // Check for at least one special character
    if (!/[!@#$%^&*]/.test(password)) {
      return false;
    }
    // If all criteria are met
    return true;
  }

  const submit = (formData) => {
    const password = formData.get("password");
    const confirmPassword  = formData.get("confirm");

    if (!isValidPassword(password)) {
      setErrorMessage(passwordRequirements);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not Match");
      return;
    }

    fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({username, name, email, phone_number, password})
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

      <input name="username" type="text" 
             placeholder="Username" value={username}
             onChange={(e) => setUsername(e.target.value)}/>

      <input name="name" type="text" 
             placeholder="Name" value={name}
             onChange={(e) => setName(e.target.value)}/>

      <input name="email" type="text" 
             placeholder="Email" value={email}
             onChange={(e) => setEmail(e.target.value)}/>

      <PhoneNumberInput
        onChange={setPhoneNumber}
        phoneNumber={phone_number}/>

      <input name="password" type="password" placeholder="Password"/>
      <input name="confirm"  type="password" placeholder="Confirm Password"/>
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
