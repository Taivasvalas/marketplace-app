import React from 'react';
import ReactDOM from 'react-dom/client';

// Stripe React File Imports
// import Buying from './Stripe React Files/Buying';
import OnboardSeller from './Stripe React Files/Onboard';
import ButtonPopup from './Stripe React Files/SellingPopup';
import RenderImages from './Stripe React Files/RenderImages';
import SeeDashBoard from './Stripe React Files/SeeDashBoard';
// import UploadFile from './Stripe React Files/UploadFile';
// import UploadFileCopy from './Stripe React Files/UploadFileCopy';

// Website React File Imports
import RenderAccounts from './Website React Files/RenderAccounts';
import UseButtonLogin from './Website React Files/UseButtonLogin';
import UseButtonRegister from './Website React Files/UseButtonRegister';
import UseButtonLogout from './Website React Files/UseButtonLogout';


const RootComponent = () => (
  <React.StrictMode>

    <RenderAccounts />


    <SeeDashBoard />

    <UseButtonRegister />
    <UseButtonLogin />
    <UseButtonLogout />

    <OnboardSeller />
    <ButtonPopup />

    <RenderImages />

    {/* <UploadFile /> */}
    {/* <UploadFileCopy /> */}

  </React.StrictMode>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RootComponent />);


// Old index rendering part -->
// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   <React.StrictMode>

//     <RenderAccounts />
//     <UseButtonRegister />
//     <UseButtonLogin />
//     <UseButtonLogout />

//     <App />
//     <CheckoutButton />
//     <Buying />
//     <OnboardSeller />

//   </React.StrictMode>
// );