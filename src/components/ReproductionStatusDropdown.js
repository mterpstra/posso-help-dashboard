const Option = (props) => {
  if (props.selected === props.value) {
    return <option value={props.value} selected="selected">{props.name}</option>
  } 
  return <option value={props.value}>{props.name}</option>
}

export const ReproductionStatusDropdown = (props) => {
  return (
    <select name="status" onChange={props.onChange}>
      <Option
        value="in_planning"
        name="In Planning"
        selected={props.selected}
      />
      <Option
        value="in_progress"
        name="In Progress"
        selected={props.selected}
      />
      <Option 
        value="in_success"
        name="Preganancy"
        selected={props.selected}
      />
      <Option 
        value="in_failure_abortion"
        name="Abortion"
        selected={props.selected}
      />
      <Option
        value="in_failure_other"
        name="Other Failure"
        selected={props.selected}
      />
    </select>
  );
}
export default ReproductionStatusDropdown;
