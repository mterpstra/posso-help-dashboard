import React, { useState } from 'react';
import PhoneNumberInput from './PhoneNumberInput.js';
import DataCollectionAdd from './DataCollectionAdd.js';

const AddTeamForm = (props) => {
  const [phone_number, setPhoneNumber] = useState("");

  // @todo: consider using user override for language 
  // const user = JSON.parse(localStorage.getItem('zapmanejo_user'));
  const language = navigator.language;

  return (
    <>
      <h3>Add Team Member</h3>
      <input type="text" name="name" 
             placeholder="Name" required/>
      <PhoneNumberInput
        language={language}
        onChange={setPhoneNumber}
        phoneNumber={phone_number}/>
    </>
  );
}

const getBodyFromForm = (formData) => {
  const name = formData.get("name");
  const phone_number = formData.get("phone_number");
  return JSON.stringify({ name, phone_number});
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
