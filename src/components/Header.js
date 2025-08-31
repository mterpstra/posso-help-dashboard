import './Header.css';
const Header = (props) => {
  return (
    <div className="Header white-container">
      <div className="logo">
        <p>ZapManejo</p>
        <span>Dashboard</span>
      </div>
      <div>
        {props.user.username}
      </div>
    </div>
  );
}
export default Header;
