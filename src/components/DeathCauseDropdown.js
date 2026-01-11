const Option = (props) => {
  if (props.selected === props.value) {
    return <option value={props.value} selected="selected">{props.name}</option>
  } 
  return <option value={props.value}>{props.name}</option>
}

export const DeathCauseDropdown = (props) => {
  return (
    <select name="cause" onChange={props.onChange}>
      <Option value="alive"  name="Alive"  selected={props.selected}/>
      <Option value="aborto" name="Aborto" selected={props.selected}/> 
      <Option value="morreu" name="Morreu" selected={props.selected}/>
      <Option value="morto"  name="Morto"  selected={props.selected}/>
      <Option value="nasceu-morto" name="Nasceu Morto" selected={props.selected}/>
      <Option value="natimorto"    name="Natimorto"    selected={props.selected}/>
      <Option value="natimortos"   name="Natimortos"   selected={props.selected}/>
      <Option value="other"  name="Other"  selected={props.selected}/>
    </select>
  );
}
export default DeathCauseDropdown;
