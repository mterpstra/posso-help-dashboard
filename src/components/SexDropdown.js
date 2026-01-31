import { useTranslation } from 'react-i18next';

const Option = (props) => {
  if (props.selected === props.value) {
    return <option value={props.value} selected="selected">{props.name}</option>
  }
  return <option value={props.value}>{props.name}</option>
}
export const SexDropdown = (props) => {
  const { t } = useTranslation();
  return (
    <select name="sex" onChange={props.onChange} style={props.style}>
      {props.showAll &&
       <option value="">{t("all_sexes")}</option>
      }
      <Option value="m" name="Male"   selected={props.selected}/>
      <Option value="f" name="Female" selected={props.selected}/>
    </select>
  );
}
export default SexDropdown;
