import { useState, useEffect } from 'react';
// import ButtonPopup from './ButtonPopup';
import '../styles.css';

import { BASE_URL80 } from '../BaseUrl';

const CheckLoggedIn = () => {
  
  const [loggedIn, setLoggedIn] = useState("");


  useEffect(() => {
    fetch(`${BASE_URL80}/Is-Logged-In`, {
      mode: "cors",
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.isLoggedIn === true) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      })
      .catch((error) => console.log("Error:", error));
  
    }, []);

    
    if (loggedIn === false){
        return (false)
        } else {
          return (true);
        }
};

export default CheckLoggedIn;
