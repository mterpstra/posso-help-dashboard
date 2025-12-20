import React, { useState } from 'react';
export const TagNumberInput = (props) => {
  const [value, setValue] = useState(props.value);
  const [edit, setEdit] = useState(props.edit);

  const onChange = (e) => {
    setValue(e.target.value);
  }

  const onClick = () => {
    setEdit(true);
    setValue(props.value);
  }

  if (!edit) {
    return (
      <div onClick={onClick} style={{cursor:"pointer"}}>
        <span>&#10000;</span>
        &nbsp;
        {props.value}
      </div>
    );
  }

  return (
    <input type="number" name="tag" 
           placeholder="Tag Number" 
           required
           autoFocus
           value={value}
           onChange={onChange}
           onBlur={props.onBlur}
    />
  );
}
export default TagNumberInput;
