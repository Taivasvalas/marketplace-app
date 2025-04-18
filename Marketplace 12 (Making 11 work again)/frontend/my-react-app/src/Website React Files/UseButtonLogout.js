import React from 'react';
import CheckLoggedIn from './CheckLoggedIn';
import '../styles.css';

import { BASE_URL80 } from '../BaseUrl';
// import { BASE_URL81 } from '../BaseUrl';
// `${BASE_URL81}/`

const UseButtonLogout = () => {

    const handleLogout = () => {
      fetch(`${BASE_URL80}/Logout`, {
        // method: 'GET', 
        mode: "cors",
        credentials: 'include' 
      })
        .then((res) => {
          res.text();
          window.location.reload();
        }) 
        .catch((error) => console.error('Error logging out:', error));
    };
  

    if (CheckLoggedIn() === true){
      return (
        <div>
          <button onClick={handleLogout}>Log Out</button>
        </div>
        )
      } else {
        return ("");
      }
};

export default UseButtonLogout;
