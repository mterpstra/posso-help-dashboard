const Option = (props) => {
  if (props.selected === props.value) {
    return <option value={props.value} selected="selected">{props.name}</option>
  } 
  return <option value={props.value}>{props.name}</option>
}

export const BreedDropdown = (props) => {
  return (
    <select name="breed" onChange={props.onChange}>
      <Option value="angus"     name="Angus"     selected={props.selected}/>
      <Option value="nalore"    name="Nalore"    selected={props.selected}/>
      <Option value="brangus"   name="Brangus"   selected={props.selected}/>
      <Option value="sta_zelio" name="Sta Zelia" selected={props.selected}/>
      <Option value="cruzado"   name="Cruzado"   selected={props.selected}/>
    </select>
  );
}
export default BreedDropdown;
