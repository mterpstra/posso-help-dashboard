import './ErrorMessage.css'
const ErrorMessage = (props) => {
  if (props.message === "") {
    return;
  }
  return (
    <div className="ErrorMessage">
      {props.message}
    </div>
  );
}
export default ErrorMessage;
