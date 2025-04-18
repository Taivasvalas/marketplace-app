import React, { useState } from 'react';
import ButtonPopup from './ButtonPopup';
import CheckLoggedIn from './CheckLoggedIn';
import '../styles.css';


const UseButtonRegister = () => {
  
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [popupText, setPopupText] = useState('');
  // const [loggedIn, setLoggedIn] = useState("");

  const openPopup = (text) => {
    setPopupText(text);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setPopupText('');
  };
    

  if (CheckLoggedIn() === false){
    return (
      <div>
            {/* <p> If you can't create an account, the account name has already been taken </p>
            <p> If you can't login, make sure to insert the correct name and password </p> */}

    <p>
      Login to purchase products
    </p>
        <button onClick={() => openPopup('Create your account and get started!')}>
          Create account
        </button>

        {isPopupVisible && <ButtonPopup text={popupText} closePopup={closePopup} />}
      </div>
      );
  } else {
    return ("");
  }
};

export default UseButtonRegister;
