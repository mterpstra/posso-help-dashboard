import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PhoneNumberInput from './PhoneNumberInput.js';
import LanguageInput from './LanguageInput.js';
import DataCollectionAdd from './DataCollectionAdd.js';

const AddTeamForm = (props) => {
  const { t } = useTranslation();
  const [phone_number, setPhoneNumber] = useState("");

  var language = navigator.language;
  const user = JSON.parse(localStorage.getItem('zapmanejo_user'));
  if (user.lang === "en-US") {
    language = user.lang;
  }

  return (
    <>
      <h3>{t("team_add")}</h3>
      <input type="text" name="name" 
             placeholder="Name" required/>
      <PhoneNumberInput
        language={language}
        onChange={setPhoneNumber}
        phoneNumber={phone_number}/>
      <LanguageInput/>
    </>
  );
}

const getBodyFromForm = (formData) => {
  const name = formData.get("name");
  const phone_number = formData.get("phone_number");
  const lang = formData.get("lang");
  return JSON.stringify({ name, phone_number, lang});
}

export const AddTeam = (props) => {
  return (
    <DataCollectionAdd
      collection="teams"
      getBodyFromForm={getBodyFromForm}
      formElements={AddTeamForm}
      onSuccess={props.onSuccess}
    />
  );
}

export default AddTeam;
