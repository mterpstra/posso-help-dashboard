import React, { useState } from 'react';
import { Fetch } from "./Utils.js";
import { GetPasswordRequirementsText, IsValidPassword } from "./Password.js";
import SuccessMessage from './SuccessMessage.js';
import ErrorMessage from './ErrorMessage.js';

export const ChangePassword = (props) => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [current_pass, setCurrentPass] = useState("");
  const [new_pass, setNewPass] = useState("");
  const [confirm_pass, setConfirmPass] = useState("");

  const submit = (formData) => {
    const current_password = formData.get("current");
    const new_password = formData.get("new");
    const confirm_password = formData.get("confirm");

    if (!IsValidPassword(new_password)) {
      setError(GetPasswordRequirementsText());
      setCurrentPass(current_password);
      setNewPass(new_password);
      return;
    }

    return;
    if (new_password !== confirm_password) {
      setError("Passwords do not Match");
      setCurrentPass(current_password);
      setNewPass(new_password);
      return;
    }


    const body = JSON.stringify({current_password, new_password});
    Fetch("api/auth/change-password", "put", body,
      () => {
        setSuccess("Password changed successfully");
        setError("");
        setCurrentPass("");
        setNewPass("");
        setConfirmPass("");
      },
      (err) => {
        setError(err);
        setSuccess("");
      }
    )}

  return (
    <div>
      <h3>Change Password</h3>
      <form className="ChangePassword DataCollectionAdd" action={submit}>

        <input type="password" 
          name="current" 
          value={current_pass} 
          onChange={(e) => {setCurrentPass(e.target.value)}}
          placeholder="Current Password"/>

        <input type="password" 
          name="new"     
          value={new_pass} 
          onChange={(e) => {setNewPass(e.target.value)}}
          placeholder="New Password"/>

        <input type="password" 
          name="confirm" 
          value={confirm_pass } 
          onChange={(e) => {setConfirmPass(e.target.value)}}
          placeholder="Confirm Password"/>

        <button type="submit">Change Password</button>
        <SuccessMessage message={success}/>
        <ErrorMessage message={error}/>
      </form>
    </div>
  );
}

export default ChangePassword;
