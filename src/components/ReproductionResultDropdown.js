export const ReproductionResultDropdown = (props) => {
  return (
    <select name="cause" value={props.result}>
      <option value="pregnancy_birth">Pregnancy and Birth</option>
      <option value="pregnancy_abort">Pregnancy and Abortion</option>
      <option value="not_pregnant">Not Pregnant</option>
    </select>
  );
}
export default ReproductionResultDropdown;
