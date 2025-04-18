import React, { useState } from 'react';
import UploadFile from './UploadFile';
import CheckRegistered from './CheckRegistered';

const SellingItem = ({ text, closeLogin }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const handleSubmitSuccess = () => {
    // Logic to close the popup after a successful submit
    closePopup();
  };

  if (CheckRegistered() === true){
    return (
      <div>
        <button onClick={openPopup}>{"SELL"}</button>

        {isPopupOpen && (
          <div className="popup">
            <div className="popup-content">
              <p>{"Sell Your Item"}</p>
              <UploadFile onSubmitSuccess={handleSubmitSuccess} />
              <button onClick={closePopup}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    )}
     else {
      // return ("Register As Seller To Sell Items");
      return ("");
    }
};

export default SellingItem;
