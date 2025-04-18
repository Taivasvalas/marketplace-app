// import React, { useState, useEffect } from 'react';

// import { BASE_URL80 } from '../BaseUrl';

// function LoginHtml() {
//   const [LoginhtmlContent, setLoginHtmlContent] = useState("");


//   useEffect(() => {

//     fetch(`${BASE_URL80}/Login`, { 
//       mode: "cors",
//       credentials: "include" })
//       .then((res) => res.text())
//       .then((data) => setLoginHtmlContent(data))
//       .catch((error) => console.log("Error:", error));

//   }, []);
    
  
//   return (
//     <div>
//       <header>
//         <div dangerouslySetInnerHTML={{ __html: LoginhtmlContent }}></div>
//       </header>
//     </div>
//   );
// }

// export default LoginHtml;


import React, { useState } from 'react';
// import React, { useState, useEffect } from 'react';
import { BASE_URL80 } from '../BaseUrl';

function RegisterHtml() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isValidLogin, setisValidLogin] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('stayLoggedIn', stayLoggedIn);

    try {
      const response = await fetch(`${BASE_URL80}/Login/Use-Form-Data`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      const data = await response.json();

      
      // console.log(data.isValidLogin)
      // console.log(data.isValidLogin)
  


      if (response.ok && data.isValidLogin === true) {
        setisValidLogin(true);
        // console.log("NIASSS 3")
        // console.log("NIASSS 3")
        // console.log("NIASSS 3")
        window.location.reload();
      } else {
        setisValidLogin(false);
        setErrorMessage(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred during validation');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="checkbox"
            name="stayLoggedIn"
            checked={stayLoggedIn}
            onChange={(e) => setStayLoggedIn(e.target.checked)}
          />
          Stay Logged In
        </label>
        <button type="submit">Login To Account</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {isValidLogin === false && <p style={{ color: 'red' }}>Username Or Password Incorrect</p>}
      {isValidLogin === true && <p style={{ color: 'green' }}>Login Valid</p>}
    </div>
  );
}

export default RegisterHtml;
