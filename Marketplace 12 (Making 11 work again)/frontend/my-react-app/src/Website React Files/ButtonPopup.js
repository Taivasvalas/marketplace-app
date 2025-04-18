import React from 'react';
import AccountHtml from './RegisterHtml';
import '../styles.css';


const ButtonPopup = ({ text, closePopup }) => (
  <div className="popup">
    <div className="popup-content">
      <p>{text}</p>
      <AccountHtml />
      <button onClick={closePopup}>Cancel</button>
    </div>
  </div>
);

export default ButtonPopup;
