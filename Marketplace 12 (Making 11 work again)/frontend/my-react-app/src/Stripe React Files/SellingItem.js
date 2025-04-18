import React from 'react';
import UploadFile from './UploadFile'; // Import your UploadFile component
import '../styles.css';


const SellingItem = ({ text, closeLogin }) => (
  <div className="popup">
    <div className="popup-content">
      <p>{text}</p>
      <UploadFile />
      <button onClick={closeLogin}>Cancel</button>
    </div>
  </div>
);

export default SellingItem;
