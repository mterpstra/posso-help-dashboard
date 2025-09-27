import React, { useState } from 'react';
const DateInput = () => {
  const [date, setDate] = useState(false);
  const handleChange = (e) => {
    setDate(e.target.value);
  }
  if (date === false) {
    const today = new Date();
    setDate(today.toISOString().substring(0, 10));
  }
  return (
    <input type="date" name="date" 
           onChange={handleChange}
           required value={date}/>
  );
}
export default DateInput;
