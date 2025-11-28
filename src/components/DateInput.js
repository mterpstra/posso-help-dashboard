import React, { useState } from 'react';
import "./DateInput.css";
const DateInput = (props) => {
  const [date, setDate] = useState(false);
  const handleChange = (e) => {
    setDate(e.target.value);
  }
  if (date === false) {
    const today = new Date();
    setDate(today.toISOString().substring(0, 10));
  }
  return (
    <div className="DateInput">
      <div>{props.prompt}</div>
      <input type="date" 
             name={(props.name) ? props.name : "date"}
             onChange={handleChange}
             required value={date}/>
    </div>
  );
}
export default DateInput;
