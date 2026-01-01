import "./Logout.css";
export const Logout = () => {
  const onClick = () => {
    localStorage.removeItem('zapmanejo_token');
    localStorage.removeItem('zapmanejo_user');
    window.location.reload();
  }

  return (
    <form class="DataCollectionAdd Logout">
      <a href="#" onClick={onClick}>Logout</a>
    </form>
  );
}

export default Logout;
