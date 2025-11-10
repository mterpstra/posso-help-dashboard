import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ErrorMessage from './ErrorMessage.js';
import './Login.css';
const Login = (props) => {
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState("");
  const submit = (formData) => {
    const email = formData.get("email");
    const password = formData.get("password");
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
      if (data.success) {
        localStorage.setItem('zapmanejo_token', data.token);
        localStorage.setItem('zapmanejo_user', JSON.stringify(data.user));
        window.location.reload();
      } else {
        setErrorMessage(data.message);
      }
    })
    .catch(error => {
      setErrorMessage(error.message);
      console.error('Error fetching data:', error);
    });
  }

  return (
    <form className="LoginForm" action={submit}>
      <h2>{t("login")}</h2>
      <input type="email"    name="email" placeholder={t("email")} required/>
      <input type="password" name="password" placeholder={t("password")} required/>
      <button type="submit">{t("login")}</button>
      <ErrorMessage message={errorMessage}/>
      <div className="links">
        <a href="#" id="register-link" 
           onClick={props.onRegisterClick}>{t("register")}</a>
        <a href="#" id="forgot-password-link" 
           onClick={props.onForgotPasswordClick}>{t("forgot_password")}</a>
      </div>
    </form>
  );
}

export default Login;
