import './ForgotPassword.css';
const ForgotPassword = (props) => {
  return (
    <form className="ForgotPasswordForm">
      <input name="email" type="text" placeholder="Email"/>
      <button type="submit">Forgot Password</button>
      <a href="#" onClick={props.onLoginClick}>Login</a>
    </form>
  );
}
export default ForgotPassword;
