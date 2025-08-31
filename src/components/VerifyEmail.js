import './VerifyEmail.css';
const VerifyEmail = (props) => {

  const submit = (formData) => {
    const code = formData.get("code");
    const email = formData.get("email");
    console.log("in submit", code, email);

    fetch('http://localhost:8080/api/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify({code, email})
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Login after code success:', data);
      localStorage.setItem('zapmanejo_token', data.token);
      localStorage.setItem('zapmanejo_user', JSON.stringify(data.user));
      window.location.reload();
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  return (
    <form className="VerifyEmailForm" action={submit}>
      <h2>Enter verification code</h2>
      <p>We sent an email to: {props.email}</p>
      <input type="text" name="code" placeholder="Enter Code" maxLength="6"/>
      <input type="text" name="email" hidden value={props.email}/>
      <button type="submit">Submit</button>
      <div className="error-message">Error</div>
      <a href="#">Login</a>
    </form>
  );
}

export default VerifyEmail;
