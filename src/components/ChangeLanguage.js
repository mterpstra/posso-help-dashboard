import i18n from "i18next";
import React, { useState, useEffect } from 'react';
import Patch from './Patch.js';
import { Fetch } from './Utils.js';
import SuccessMessage from './SuccessMessage.js';
import ErrorMessage from './ErrorMessage.js';

export const ChangeLanguage = (props) => {

  const [profile, setProfile] = useState([]);
  const [success, setSuccess] = useState("");
  const [error,   setError] = useState("");
  const [language, setLanguage] = useState("");

  const handleLanguage = (e) => {
    const new_lang = e.target.value;
    Patch("users", profile._id, "lang", new_lang,
      () => {
        setSuccess("Change Successful");
        setLanguage(new_lang);
        i18n.changeLanguage(new_lang);
      },
      (err) => {
        console.error('Error updating form data');
        setError(err);
      }
    );
  };

  useEffect(() => {
    const url = `/api/data/users`;
    const fetchData = () => {
      Fetch(url, "GET", null, 
        (data) => {
          setProfile(data[0]);
          setLanguage(data[0].lang);
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    }
    fetchData();
  }, []);

  return (
    <form className="DataCollectionAdd">
      <h3>Change your preferred language</h3>
      <select name="lang" value={language} 
        onChange={handleLanguage}>
        <option value="en-US">English</option>
        <option value="pt-BR">Portuguese</option>
      </select>
      <SuccessMessage message={success}/>
      <ErrorMessage message={error}/>
    </form>
  );
}

export default ChangeLanguage;
