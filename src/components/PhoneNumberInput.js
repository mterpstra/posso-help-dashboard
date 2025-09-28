import React, { useState } from 'react';
export const PhoneNumberInput = (props) => {

  const handleAsUS= (e) => {
    let value = e.target.value.replace(/\D/g, ''); 

    const first = value.substring(0,1);
    if (value.length===1 && value.substring(0,1) != "1" ) {
      value = `1${value}`;
      console.log("setting value", value);
    }

    let formattedValue = '';
    if (value.length > 0) {
      formattedValue += value.substring(0, 1);
    }
    if (value.length > 1) {
      formattedValue += '-' + value.substring(1, 4);
    }
    if (value.length > 4) {
      formattedValue += '-' + value.substring(4, 7);
    }
    if (value.length > 7) {
      formattedValue += '-' + value.substring(7, 11);
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
      formattedValue += '-' + value.substring(2, 4);
    }
    if (value.length > 4) {
      formattedValue += '-' + value.substring(4, 9);
    }
    if (value.length > 9) {
      formattedValue += '-' + value.substring(9, 13);
    }
    props.onChange(formattedValue);
  }

  let placeholder = "enter phone number";
  let handler=null;
  if (props.language === "en-US") {
    handler = handleAsUS;
    placeholder="1-xxx-xxx-xxxx";
  } else {
    handler = handleAsBrasil;
    placeholder="xx-xx-xxxxx-xxxx";
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
