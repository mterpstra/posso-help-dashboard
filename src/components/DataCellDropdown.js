import React, { useState } from 'react';
import Patch from "./Patch.js";
const DataCellDropdown = (props) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(props.initialValue);

  const change = (e) => {
    if (value === e.target.value) {
      console.log("values match", value, e.target.value);
      return;
    }
    let newValue = e.target.value;
    if ("boolean" === typeof props.initialValue) {
      newValue = (e.target.value === "true") ? true : false;
    }
    Patch(props.collection, props.id, props.field, newValue,
      () => {
        console.log("patch successfull");
        setEdit(false);
        setValue(newValue);
      },
      () => {
        console.log("patch error");
      }
    )
  }

  if (!edit) {
    // We want to display the name instead of the value
    let name=value;
    for (const option of props.options) {
      if (value === option.value) {
        name = option.name;
      }
    }
    return (
      <div onClick={() => setEdit(true)}>
        {name}
      </div>
    );
  }

  const Option = (props) => {
    const selected = (props.value === props.selected) ? "selected" : "";
    return (
      <option key={props.name} value={props.value} selected={selected}>
        {props.name}
      </option>
    );
  }

  return (
    <select onChange={change}>
      {props.options.map((option) => (
        <Option 
          name={option.name}
          value={option.value}
          selected={value}
        />
      ))}
    </select>
  );
}
export default DataCellDropdown;
