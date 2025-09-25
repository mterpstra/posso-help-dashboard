import React, { useState } from 'react';
export const PhoneNumberInput = (props) => {
  const [phoneNumber, setPhoneNumber] = useState(props.phoneNumber);
  const handleChange = (e) => {
    // Remove non-digits
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
  return (
    <input name="phone_number" type="tel"
      placeholder="xxx-xxx-xxxx"
      value={props.phoneNumber}
      onChange={handleChange}/>
  );
}
export default PhoneNumberInput;
