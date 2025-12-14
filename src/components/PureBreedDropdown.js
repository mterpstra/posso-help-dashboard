const Option = (props) => {
  if (props.selected === props.value) {
    return <option value={props.value} selected="selected">{props.name}</option>
  } 
  return <option value={props.value}>{props.name}</option>
}
export const PureBreedDropdown = (props) => {
  return (
    <select name="sex" onChange={props.onChange}>
      <Option value={true}  name="Pure"  selected={props.selected}/>
      <Option value={false} name="No"    selected={props.selected}/>
    </select>
  );
}
export default PureBreedDropdown;
