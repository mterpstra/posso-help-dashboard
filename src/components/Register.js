import './Register.css';
const Register = (props) => {

  const submit = (formData) => {
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    console.log("in submit", email, password);

    fetch('http://localhost:8080/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({username, email, password})
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Data fetched successfully:', data);
      console.log('props, probably null', props);
      props.onRegisterSuccessfull(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  return (
    <form className="RegisterForm" action={submit}>
      <input name="username" type="text" placeholder="Username"/>
      <input name="email" type="text" placeholder="Email"/>
      <input name="phonenumber" 
             type="tel" placeholder="WhatsApp (opcional): +5511999999999"/>
      <input name="password" type="password" placeholder="Password"/>
      <input type="password" placeholder="Confirm Password"/>
      <button type="submit">Register</button>
      <div className="error-message">Error</div>
      <div className="success-message">Success</div>
      <a href="#" onClick={props.onLoginClick}>Login</a>
    </form>
  );
}
export default Register;
