import React, { useState } from 'react';
export const PhoneNumberInput = (props) => {

  const handleAsUS= (e) => {
    let value = e.target.value.replace(/\D/g, ''); 
    let formattedValue = '';
    if (value.length > 0) {
      formattedValue += value.substring(0, 3);
    }
    if (value.length > 3) {
      formattedValue += '-' + value.substring(3, 6);
    }
    if (value.length > 6) {
      formattedValue += '-' + value.substring(6, 10);
    }
    props.onChange(formattedValue);
  }

  const handleAsBrasil = (e) => {
    let value = e.target.value.replace(/\D/g, ''); 
    let formattedValue = '';
    if (value.length > 0) {
      formattedValue += value.substring(0, 2);
    }
    if (value.length > 2) {
      formattedValue += '-' + value.substring(2, 7);
    }
    if (value.length > 7) {
      formattedValue += '-' + value.substring(7, 11);
    }
    props.onChange(formattedValue);
  }

  let placeholder = "enter phone number";
  let handler=null;
  if (props.language === "en-US") {
    handler = handleAsUS;
    placeholder="xxx-xxx-xxxx";
  } else {
    handler = handleAsBrasil;
    placeholder="xx-xxxxx-xxxx";
  }

  return (
    <input name="phone_number" type="tel"
      required
      placeholder={placeholder}
      value={props.phoneNumber}
      onChange={handler}/>
  );
}
export default PhoneNumberInput;
