import React from 'react';
import checkLoggedIn from '../Website React Files/CheckLoggedIn';

import { BASE_URL81 } from '../BaseUrl';

const Buying = ({  price, receiver, name, itemId }) => {
  // console.log(receiver)
  // console.log(price)
  // console.log(name)
  // console.log(req.body)
  if (checkLoggedIn() === true){
    return (
      <div>  

        <button onClick = {() => {
        // console.log(receiver)
        // console.log(price)
        // console.log(name)
          fetch(`${BASE_URL81}/create-checkout-session`, {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              items: 
                {  quantity: 2, receiver: receiver, price: price, name: name, itemId: itemId },
                // { id: 2, quantity: 1 },
              
            }),
          })
            .then(res => {
              if (res.ok) return res.json()
              return res.json().then(json => Promise.reject(json))
            })
            .then(({ url }) => {
              window.location = url
            })
            .catch(e => {
              console.error(e.error)
            })
        }}>
          Checkout
        </button>
      </div>
    )
  } else {
    return ("");
  }
};

export default Buying;
