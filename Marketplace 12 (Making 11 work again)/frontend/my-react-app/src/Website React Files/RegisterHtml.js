import React, { useState } from 'react';
// import React, { useState, useEffect } from 'react';
import { BASE_URL80 } from '../BaseUrl';

function RegisterHtml() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('stayLoggedIn', stayLoggedIn);

    try {
      const response = await fetch(`${BASE_URL80}/Register-New-Account/Use-Form-Data`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      const data = await response.json();

      
      // console.log(data.isValidCreateAccount)
      // console.log(data.isValidCreateAccount)
  


      if (response.ok && data.isValidCreateAccount === true) {
        setIsUsernameValid(true);
        // console.log("NIASSS 2")
        // console.log("NIASSS 2")
        // console.log("NIASSS 2")
        window.location.reload();
      } else {
        setIsUsernameValid(false);
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
        <button type="submit">Create Account</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {isUsernameValid === false && <p style={{ color: 'red' }}>Username Is Taken</p>}
      {isUsernameValid === true && <p style={{ color: 'green' }}>Username Is Valid</p>}
    </div>
  );
}

export default RegisterHtml;
