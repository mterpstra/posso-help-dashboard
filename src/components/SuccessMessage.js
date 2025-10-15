import './SuccessMessage.css'
const SuccessMessage = (props) => {
  if (props.message === "") {
    return;
  }
  return (
    <div className="SuccessMessage">
      {props.message}
    </div>
  );
}
export default SuccessMessage;
