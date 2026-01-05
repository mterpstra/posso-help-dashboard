// Note, this component is used in multiple places.
// Probably not best to have static CSS since it may
// vary based on context this component is displayed in.
const Days = (props) => {
  if (props.start === props.end) {
    return (
      <span className="Days">
        Day: {props.start}
      </span >
    );
  }
  return (
    <span className="Days">
      Days: {props.start} - {props.end}
    </span>
  );
}
export default Days;
