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
  const [fetching, setFetching] = useState(false);

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

    setFetching(true);

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
    })
    .finally(() => {
      setFetching(false);
    });
  }

  const Overlay = () => {
    return (
      <div class="form-overlay">
        <div class="loader"></div>
      </div>
    );
  }

  const language = navigator.language;
  return (
    <div class="form-container">
    {fetching ? <Overlay/>:""}
    <form className="RegisterForm" action={submit}>
      <h2>Register</h2>

      <input name="username" type="text" required
             placeholder="Username" value={username}
             onChange={(e) => setUsername(e.target.value)}/>

      <input name="name" type="text" required
             placeholder="Name" value={name}
             onChange={(e) => setName(e.target.value)}/>

      <input name="email" type="text" required 
             placeholder="Email" value={email}
             onChange={(e) => setEmail(e.target.value)}/>

      <PhoneNumberInput
        language={language}
        onChange={setPhoneNumber}
        phoneNumber={phone_number}/>

      <input name="password" type="password" placeholder="Password" required/>
      <input name="confirm"  type="password" placeholder="Confirm Password"/>
      <button type="submit">Register</button>
      <ErrorMessage message={errorMessage}/>
      <div className="success-message">Success</div>
      <div className="links">
        <a href="#" onClick={props.onLoginClick}>Login</a>
      </div>
    </form>
    </div>
  );
}
export default Register;
