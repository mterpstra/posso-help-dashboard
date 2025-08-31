import logo from './logo.svg';
import './App.css';
import AuthenticatedApp from './components/AuthenticatedApp.js'
import UnauthenticatedApp from './components/UnauthenticatedApp.js'

function App() {
  const token = localStorage.getItem('zapmanejo_token');
  const user = JSON.parse(localStorage.getItem('zapmanejo_user') || 'null');
  const isAuthenticated = token && user && user.is_active;
  return (
    <>
      {isAuthenticated ? 
        <AuthenticatedApp token={token} user={user}/> : 
        <UnauthenticatedApp/>
      }
    </>
  );
}

export default App;
