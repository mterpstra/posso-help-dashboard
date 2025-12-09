import React, { useState } from 'react';
import Patch from "./Patch.js";
const DataCellInput = (props) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(props.initialValue);
  const blur = (e) => {
    setEdit(false);

    // The double equal is on purpose here.  The passed in
    // value may be of type number and this is type string.
    if (props.initialValue == value) {
      return;
    }

    Patch(props.collection, props.id, props.field, 
      parseInt(value, 10),
      () => {console.log("patch successfull")},
      () => {console.log("patch error")})
  }

  if (!edit) {
    return (
      <div onClick={() => setEdit(true)}>
        {value}
      </div>
    );
  }

  return (
    <input 
      value={value}
      onBlur={blur}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
export default DataCellInput;
