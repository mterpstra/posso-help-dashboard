const Option = (props) => {
  if (props.selected === props.value) {
    return <option value={props.value} 
      selected="selected">
      {props.name}
    </option>
  } 
  return <option value={props.value}>{props.name}</option>
}

export const ReproductionResultDropdown = (props) => {
  return (
    <select name="cause" onChange={props.onChange} value={props.result}>
      <option value="" disabled selected hidden>-- Choose a Result --</option>
      <Option value="pregnancy_birth" name="Pregnancy and Birth"    selected={props.selected}/>
      <Option value="pregnancy_abort" name="Pregnancy and Abortion" selected={props.selected}/>
      <Option value="not_pregnant"    name="Not Pregnant"           selected={props.selected}/>
    </select>
  );
}
export default ReproductionResultDropdown;
