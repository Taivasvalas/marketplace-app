import React from 'react';
import CheckLoggedIn from '../Website React Files/CheckLoggedIn';
import CheckRegistered from './CheckRegistered';

import { BASE_URL80 } from '../BaseUrl';
import { BASE_URL81 } from '../BaseUrl';

const OnboardSeller = () => {
  // let accountId = null
  // let urlParams = null
  let isRegistered = CheckRegistered();

  if ((CheckLoggedIn() === true) && (isRegistered === false)){
    return (
      <div>  

        <button onClick = {async() => {
          // console.log("\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n")
          const response = await fetch(`${BASE_URL80}/CheckAccountId`, {
            // method: 'POST',
            mode: "cors",
            credentials: 'include',
            // headers: {
            //   'Content-Type': 'application/json',
            //   // Add any other headers as needed
            // },
            // body: JSON.stringify(dataToSend),
          });
          if (!response.ok) {
            throw new Error(`\n\n\n\n\n\nE\nR\nR\nO\nR from Backend #1: ${response.statusText}`);
          }
          const accountNumber = await response.json();
          // console.log('\n\n\nData from Backend #\n#\n#\n#\n#\n#\n#\n#######:', accountNumber.accountNumber, "\n\n\n");
          // console.log('\n\n\nData from Backend #\n#\n#\n#\n#\n#\n#\n#######:', accountNumber.accountNumber, "\n\n\n");
          // console.log('\n\n\nData from Backend #\n#\n#\n#\n#\n#\n#\n#######:', accountNumber.accountNumber, "\n\n\n");
          // console.log('\n\n\nData from Backend #\n#\n#\n#\n#\n#\n#\n#######:', accountNumber.accountNumber, "\n\n\n");
          // console.log('\n\n\nData from Backend #\n#\n#\n#\n#\n#\n#\n#######:', accountNumber, "\n\n\n");
          // console.log('\n\n\nData from Backend #\n#\n#\n#\n#\n#\n#\n#######:', accountNumber, "\n\n\n");


          const accountNumberTrue = accountNumber.accountNumber
          // console.log(accountNumberTrue)
          // console.log(accountNumberTrue)
          // console.log(accountNumberTrue)
          // console.log(accountNumberTrue)
          // console.log(accountNumberTrue)
          // console.log(accountNumberTrue)



          fetch(`${BASE_URL81}/onboard-seller`, {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              accountNumberTrue: accountNumberTrue,
            }),
          })
            .then(res => {
              if (res.ok) return res.json()
              // return res.json().then(json => Promise.reject(json))
            })
            .then(({ url }) => {
              window.location = url
            })
            .catch(e => {
              console.error(e.error)
            })
        }}>
          Register as Seller
        </button>
      </div>
    )
  } else {
    return ("");
  }
};

export default OnboardSeller;
