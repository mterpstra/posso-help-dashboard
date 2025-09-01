import './UnauthenticatedApp.css'
import Register from './Register.js'
import Login from './Login.js'
import VerifyEmail from './VerifyEmail.js'
import ForgotPassword from './ForgotPassword.js'

import React, { useState } from 'react';

const UnauthenticatedApp = () => {
  const [screen, setScreen] = useState("login");
  const [user, setUser] = useState({});

  return (
    <div className="UnauthenticatedApp">
    <div className="white-container">
      {screen == "login" && 
        <Login 
          onRegisterClick={() => setScreen("register")}
          onForgotPasswordClick={() => setScreen("forgot")}
        />
      }

      {screen == "register" && 
        <Register
          onLoginClick={() => setScreen("login")}
          onRegisterSuccessfull={(response) => {
            if (response.success) {
              setScreen("verify");
              setUser(response.user);
              console.log("Good so far", response);
            } else {
              // @todo: Put the message on the page
              console.log("error", response);
            }
          }}
        />
      }

      {screen == "verify" && 
        <VerifyEmail email={user.email}
          onLoginClick={() => setScreen("login")}
        />
      }

      {screen == "forgot" && 
        <ForgotPassword
          onLoginClick={() => setScreen("login")}
        />
      }
    </div>
    </div>
  );
}
export default UnauthenticatedApp;
