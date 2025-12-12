export const ReproductionStatusDropdown = (props) => {
  return (
    <select name={props.name}>
      <option value="in_planning">In Planning</option>
      <option value="in_progress">In Progress</option>
      <option value="in_post">In Post</option>
    </select>
  );
}
export default ReproductionStatusDropdown;
