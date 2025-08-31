import './Login.css';
const Login = (props) => {

  const submit = (formData) => {
    const email = formData.get("email");
    const password = formData.get("password");
    console.log("in submit", email, password);

    fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({email, password})
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Login success:', data);
      localStorage.setItem('zapmanejo_token', data.token);
      localStorage.setItem('zapmanejo_user', JSON.stringify(data.user));
      window.location.reload();
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  return (
    <form className="LoginForm" action={submit}>
      <input type="email"    name="email" placeholder="Email" required/>
      <input type="password" name="password" placeholder="Password" required/>
      <button type="submit">Login</button>
      <div className="error-message">Error</div>
      <a href="#" onClick={props.onRegisterClick}>Register</a>
      <a href="#" onClick={props.onForgotPasswordClick}>Forgot Password</a>
    </form>
  );
}

export default Login;
