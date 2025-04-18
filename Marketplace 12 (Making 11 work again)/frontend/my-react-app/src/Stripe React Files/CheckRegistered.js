import { useState, useEffect } from 'react';
// import ButtonPopup from './ButtonPopup';
import '../styles.css';

import { BASE_URL80 } from '../BaseUrl';

const CheckRegistered = () => {
  
  const [Registered, setRegistered] = useState("");


  useEffect(() => {
    fetch(`${BASE_URL80}/SessionSeller`, {
      mode: "cors",
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        // console.log(data.isRegistered)
        if (data.isRegistered === true) {
          setRegistered(true);
        } else {
          setRegistered(false);
        }
      })
      .catch((error) => console.log("Error:", error));
  
    }, []);


    if (Registered === false){
        return (false)
        } else {
          return (true);
        }
};

export default CheckRegistered;
