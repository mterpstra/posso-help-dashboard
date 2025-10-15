import './Header.css';
import { useTranslation } from 'react-i18next';

const onClickLogout = () => {
  localStorage.removeItem('zapmanejo_token');
  localStorage.removeItem('zapmanejo_user');
  window.location.reload();
}

const Header = (props) => {

  const onClickProfile = () => {
    props.onClickProfile();
  }

  const { t } = useTranslation();
  return (
    <div className="Header white-container">
      <div className="logo">
        <p>ZapManejo</p>
        <span>{t('dashboard')}</span>
      </div>
      <div className="profile">

        <div onClick={onClickProfile}>
          <a href="#">{props.user.name}</a>
        </div>

        <div onClick={onClickLogout}>
          <a href="#">Log out</a>
        </div>

      </div>
    </div>
  );
}
export default Header;
