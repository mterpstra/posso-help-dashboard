import React, { useState } from 'react';

const DateInput = (props) => {
  const [date, setDate] = useState(props.date);
  const handleChange = (e) => {
    console.log("setting date to:", e.target.value);
    setDate(e.target.value);
    if (props.onChange) {
      props.onChange(e.target.value);
    }
  }

  if (date === false || date === "" || date === null) {
    const today = new Date();
    setDate(today.toISOString().substring(0, 10));
  }

  const name = (props.name != null && props.name != "") ? props.name : "date";

  return (
    <input type="date" name={name} 
           onChange={handleChange}
           required value={date}/>
  );
}
export default DateInput;
