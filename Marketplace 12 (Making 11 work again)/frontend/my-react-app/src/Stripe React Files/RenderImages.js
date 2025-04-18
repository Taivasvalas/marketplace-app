import React, { useState, useEffect } from 'react';
import Buying from './Buying';

import { BASE_URL81 } from '../BaseUrl';


const RenderImages = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${BASE_URL81}/get-items`);
        const data = await response.json();
        setItems(data);
        console.log("\n\ndataaaaaaaaa nyt OIKEESTII TÄREKÄ\n: ",data)
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);
  
  
  const calculateImageSize = (originalWidth, originalHeight, maxSize) => {
    let width = originalWidth;
    let height = originalHeight;

    if (width > maxSize || height > maxSize) {
      const aspectRatio = originalWidth / originalHeight;

      if (width > height) {
        width = maxSize;
        height = width / aspectRatio;
      } else {
        height = maxSize;
        width = height * aspectRatio;
      }
    }

    return { width, height };
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {items.map((item, index) => {
        const imageSize = calculateImageSize(300, 300, 500); // Adjust 500 to your desired max size


        
  // console.log(item.sellerNumber)
  // console.log(item.sellerNumber)
  // console.log(item.sellerNumber)
  // console.log(item.sellerNumber)
  // console.log(item.sellerNumber)
  // console.log(item.sellerNumber)
  // console.log(item.sellerNumber)
  // console.log(item.sellerNumber)
  // console.log(item.sellerNumber)
  // console.log(item.sellerNumber)
  // console.log(item.sellerNumber)
  // console.log(item.sellerNumber)
  // console.log(item.sellerNumber)
  // console.log(item.sellerNumber)

        return (
          <div
            key={index}
            style={{
              flex: '0 0 100%', // Make each box fill the entire row
              maxWidth: '24%',
              boxSizing: 'border-box',
              padding: '10px',
              marginLeft: '10px',
              marginRight: '10px',
              marginBottom: '15px', // Add margin between items
              backgroundColor: '#f2f2f2', // Gray background color
              border: '2px solid #ccc', // Add a border around each item
              borderRadius: '5px', // Optional: Add border radius for rounded corners
            }}
          >
            <h3 style={{ marginBottom: '5px', marginTop: '0' }}>{item.name}</h3>
            <img
              src={item.imageUrl}
              alt={item.name}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                width: imageSize.width,
                height: imageSize.height,
                objectFit: 'contain',
                marginBottom: '5px', // Add margin between image and description
              }}
            />
            <p>{`Price: ${item.price} ${item.currency}`}</p>
            <p style={{ marginTop: '0' }}>{item.description}</p>
            <p style={{ marginTop: '0' }}>{`For More Info: ${item.info}`}</p>
            
            {/* <p style={{ marginTop: '10' }}> Item Id: {item.itemId}</p> */}
            
            <Buying
              // id={item.id}
              // quantity={1}  // Set the quantity as needed
              price={ item.price }
              receiver={ item.sellerNumber }
              name={item.name }
              itemId={item.itemId }
              
            />  
            

          </div>
        );
      })}
    </div>
  );
};

export default RenderImages;
