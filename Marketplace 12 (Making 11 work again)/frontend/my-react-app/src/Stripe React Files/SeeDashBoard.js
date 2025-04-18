import React from 'react';

import CheckRegistered from './CheckRegistered';

import { BASE_URL80 } from '../BaseUrl';
import { BASE_URL81 } from '../BaseUrl';

const SeeDashBoard = ({ text, closeLogin }) => {
  // const [isPopupOpen, setPopupOpen] = useState(false);
  // const [dashboardUrl, setDashboardUrl] = useState(null);

  if (CheckRegistered() === true){
    return (
      <div>  

        <button onClick = {async() => {
          
          const accountNumberResponse = await fetch(`${BASE_URL80}/CheckSellerNumber`, {
            method: 'GET',
            mode: "cors",
            credentials: 'include',
          });
          if (!accountNumberResponse.ok) {
            throw new Error(`Error fetching sellerNumber: ${accountNumberResponse.statusText}`);
          }
          const accountNumberData = await accountNumberResponse.json();



          // console.log("accountNumberData")
          // console.log("accountNumberData")

          // console.log(accountNumberData.accountNumber)
          // console.log(accountNumberData.accountNumber)

          // console.log(accountNumberData)
          // console.log(accountNumberData)



          fetch(`${BASE_URL81}/get-dashboard-url`, {
            method: 'POST',
            mode: "cors",
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sellerNumber: accountNumberData.sellerNumber })
          }).then(res => {
              if (res.ok) return res.json()
              // return res.json().then(json => Promise.reject(json))
            })
            .then(({ url }) => {
              // Ohjaa dashboardille. Muokkaa nykyisen url dashboard url:ksi
              // window.location = url

              // window.location.href = url

              // Opens dashboard on a new page. Blank = user settings prefered way
              window.open(url, '_blank');
            })
            .catch(e => {
              console.error(e.error)
            })
        }}>
          See Dashboard
        </button>
      </div>
    )}
     else {
  return ("")
}
}


export default SeeDashBoard;