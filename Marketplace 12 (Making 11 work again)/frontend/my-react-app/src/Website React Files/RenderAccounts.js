// import React, { useState, useEffect } from 'react';
import React, { useEffect } from 'react';

import { BASE_URL80 } from '../BaseUrl';


function RenderAccounts() {
  // const [htmlContent, setHtmlContent] = useState("");


  useEffect(() => {

    fetch(`${BASE_URL80}/accountData`, { 
      mode: "cors",
      credentials: "include"  })
      .then((res) => res.text())
      // .then((data) => setHtmlContent(data))
      .catch((error) => console.log("Error:", error));

  }, []);


  return (
    <div>
      <header>
        {/* Toi alempi rivi on kommentoituna, koska en halua, että käyttäjien tiedot näkyy sivuston yläreunassa. Kuitenkin tämä file pitää olla lisättynä index.js koodiin, sillä muuten käyttäjät eivät jostain syytä voi log in käyttäjille */}
        {/* <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div> */}
      </header>
    </div>
  );
};

export default RenderAccounts;