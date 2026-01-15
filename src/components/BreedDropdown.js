const Option = (props) => {
  if (props.selected === props.value) {
    return <option value={props.value} selected="selected">{props.name}</option>
  } 
  return <option value={props.value}>{props.name}</option>
}

export const BreedDropdown = (props) => {
  return (
    <select name="breed" onChange={props.onChange}>
      {!props.selected && 
       <option value="" disabled selected hidden>-- Choose an Breed --</option>
      }
      <Option value="angus"        name="Angus"        selected={props.selected}/>
      <Option value="nelore"       name="Nelore"       selected={props.selected}/>
      <Option value="brangus"      name="Brangus"      selected={props.selected}/>
      <Option value="sta_zelia"    name="Sta Zelia"    selected={props.selected}/>
      <Option value="cruzada"      name="Cruzada"      selected={props.selected}/>
      <Option value="murrah"       name="Murrah"       selected={props.selected}/>
      <Option value="mediterrâneo" name="Mediterrâneo" selected={props.selected}/>
      <Option value="jafarabadi"   name="Jafarabadi"   selected={props.selected}/>
      <Option value="carabao"      name="Carabao"      selected={props.selected}/>
    </select>
  );
}
export default BreedDropdown;
