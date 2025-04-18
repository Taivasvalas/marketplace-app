import React, { useState } from 'react';
import ButtonLogin from './ButtonLogin';
import CheckLoggedIn from './CheckLoggedIn';
import '../styles.css';


const UseButtonLogin = () => {

  const [isLoginVisible, setLoginVisible] = useState(false);
  const [loginText, setLoginText] = useState('');

  
  const openLogin = (text) => {
    setLoginText(text);
    setLoginVisible(true);
  };
  
  const closeLogin = () => {
    setLoginVisible(false);
    setLoginText('');
  };
  

  if (CheckLoggedIn() === false){
  return (
    <div>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"></link>

      <button id="loginButton" onClick={() => openLogin('Login to your account: ')}>
        <i className="material-icons">login</i>
      </button>

      {isLoginVisible && <ButtonLogin text={loginText} closeLogin={closeLogin} />}
    </div>
    )
  } else {
    return ("");
  }
};

export default UseButtonLogin;