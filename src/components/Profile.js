import ChangeLanguage from './ChangeLanguage.js';
import ChangePassword from './ChangePassword.js';
import Logout from './Logout.js';
import { useTranslation } from 'react-i18next';
import './Profile.css';

export const Profile = (props) => {
  const { t } = useTranslation();
  const user = JSON.parse(localStorage.getItem('zapmanejo_user'));
  return (
    <div>
      <h2>{t("profile")}</h2>
      <div className="Profile">
        {
          user.name && 
          <div>
            <span>{t("name")}:</span>
            {user.name}
          </div>
        }

        {
          user.email && 
          <div>
            <span>{t("email")}:</span>
            {user.email}
          </div>
        }

        {
          user.phone_number &&
          <div>
            <span>{t("phone_number")}:</span>
            {user.phone_number}
          </div>
        }
      </div>
      <ChangeLanguage/>
      <br/>
      <ChangePassword/>
      <br/>
      <Logout/>
    </div>
  );
}
export default Profile;
