import './ForgotPassword.css';
const ForgotPassword = (props) => {
  return (
    <form className="ForgotPasswordForm">
      <h2>Forgot Password</h2>
      <input name="email" type="text" placeholder="Email"/>
      <button type="submit">Forgot Password</button>
      <div className="links">
        <a href="#" onClick={props.onLoginClick}>Login</a>
      </div>
    </form>
  );
}
export default ForgotPassword;
