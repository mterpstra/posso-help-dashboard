import './ForgotPassword.css';
import { useTranslation } from 'react-i18next';
const ForgotPassword = (props) => {
  const { t } = useTranslation();
  return (
    <form className="ForgotPasswordForm">
      <h2>{t("forgot_password")}</h2>
      <input name="email" type="text" 
             placeholder={t("email")}/>
      <button type="submit">{t("forgot_password")}</button>

      <div className="links">
        <a href="#" onClick={props.onLoginClick}>{t("login")}</a>
      </div>

    </form>
  );
}
export default ForgotPassword;
