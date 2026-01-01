import ChangeLanguage from './ChangeLanguage.js';
import ChangePassword from './ChangePassword.js';
import Logout from './Logout.js';

export const Profile = (props) => {
  return (
    <div>
      <h2>Profile</h2>
      <ChangeLanguage/>
      <br/>
      <ChangePassword/>
      <br/>
      <Logout/>
    </div>
  );
}
export default Profile;
