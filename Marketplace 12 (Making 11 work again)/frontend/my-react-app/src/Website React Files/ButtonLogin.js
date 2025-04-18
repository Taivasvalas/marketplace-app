import React from 'react';
import LoginHtml from './LoginHtml';


const ButtonLogin = ({ text, closeLogin }) => (
  <div className="popup">
    <div className="popup-content">
      <p>{text}</p>
      <LoginHtml />
      <button onClick={closeLogin}>Cancel</button>
    </div>
  </div>
);

export default ButtonLogin;
