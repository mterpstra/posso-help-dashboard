import './Header.css';

const onClickLogout = () => {
  localStorage.removeItem('zapmanejo_token');
  localStorage.removeItem('zapmanejo_user');
  window.location.reload();
}

const Header = (props) => {
  return (
    <div className="Header white-container">
      <div className="logo">
        <p>ZapManejo</p>
        <span>Dashboard</span>
      </div>
      <div className="profile">
        <div>{props.user.name}</div>
        <div onClick={onClickLogout}><a href="#">Log out</a></div>
      </div>
    </div>
  );
}
export default Header;
