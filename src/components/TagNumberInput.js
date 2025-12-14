import React, { useState } from 'react';
export const TagNumberInput = (props) => {
  const [value, setValue] = useState(props.value);
  const onChange = (e) => {
    setValue(e.target.value);
  }
  return (
    <input type="number" name="tag" 
           placeholder="Tag Number" required
           value={value}
           onChange={onChange}
           onBlur={props.onBlur}
    />
  );
}
export default TagNumberInput;
