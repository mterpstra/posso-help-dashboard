import React, { useState } from 'react';
export const TagNumberInput = (props) => {
  const [value, setValue] = useState(props.value);
  const [edit, setEdit] = useState(props.edit);

  const onChange = (e) => {
    setValue(e.target.value);
  }

  if (!edit) {
    return (
      <div onClick={() => {setEdit(true)}}>
        {props.value}
      </div>
    );
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
