import React, { useState } from 'react';
import { IsValidPassword } from "./Password.js";
import { useTranslation } from 'react-i18next';
import ErrorMessage from './ErrorMessage';
import PhoneNumberInput from './PhoneNumberInput.js';
import './Register.css';
const Register = (props) => {
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [fetching, setFetching] = useState(false);

  const submit = (formData) => {
    const password = formData.get("password");
    const confirmPassword  = formData.get("confirm");

    if (!IsValidPassword(password)) {
      setErrorMessage(t("password_requirements"));
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not Match");
      return;
    }

    setFetching(true);

    fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({name, email, phone_number, password})
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
      <h2>{t("register")}</h2>

      <input name="name" type="text" required
             placeholder={t("name")} value={name}
             onChange={(e) => setName(e.target.value)}/>

      <input name="email" type="text" required 
             placeholder={t("email")} value={email}
             onChange={(e) => setEmail(e.target.value)}/>

      <PhoneNumberInput
        language={language}
        onChange={setPhoneNumber}
        phoneNumber={phone_number}/>


      <div>
        {t("password_requirements")}
      </div>

      <input name="password" type="password" 
             placeholder={t("password")} required/>

      <input name="confirm"  type="password" 
             placeholder={t("confirm_password")} required/>

      <button type="submit">{t("register")}</button>

      <ErrorMessage message={errorMessage}/>

      <div className="success-message">Success</div>
      <div className="links">
        <a href="#" onClick={props.onLoginClick}>{t("login")}</a>
      </div>
    </form>
    </div>
  );
}
export default Register;
