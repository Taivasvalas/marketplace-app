import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import { BASE_URL80 } from '../BaseUrl';
import { BASE_URL81 } from '../BaseUrl';

const UploadFile = ({ onSubmitSuccess }) => {
  const [file, setFile] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [info, setInfo] = useState('');
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('USD'); // Default to USD
  const [imageUrl, setImageUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');
  const isSmallScreen = useMediaQuery({ maxWidth: 768 });

  // Variables for customization
  const maxNameLength = 50;
  const maxDescriptionLength = 200;
  const maxInfoLength = 80;
  const minDescriptionHeight = 100;
  const minInfoHeight = 100;
  const nameFieldWidth = '300px';
  const nameFieldHeight = '40px';
  const descriptionFieldWidth = '300px';
  const infoFieldWidth = '300px';
  const descriptionFieldMinHeight = `${minDescriptionHeight}px`;
  const infoFieldMinHeight = `${minInfoHeight}px`;
  const priceFieldWidth = '300px';
  const priceFieldHeight = '40px';

  // const calculateImageSize = (originalWidth, originalHeight, maxSize) => {
  //   let width = originalWidth;
  //   let height = originalHeight;

  //   if (width > maxSize || height > maxSize) {
  //     const aspectRatio = originalWidth / originalHeight;

  //     if (width > height) {
  //       width = maxSize;
  //       height = width / aspectRatio;
  //     } else {
  //       height = maxSize;
  //       width = height * aspectRatio;
  //     }
  //   }

  //   return { width, height };
  // };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    setFile(selectedFile);

    if (selectedFile) {
      // Read the selected file and set the preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      // Clear the preview URL if no file is selected
      setPreviewUrl('');
    }
  };

  const handleNameChange = (event) => {
    const newName = event.target.value.substring(0, maxNameLength);
    setName(newName);
  };

  const handleDescriptionChange = (event) => {
    const newDescription = event.target.value.substring(0, maxDescriptionLength);
    setDescription(newDescription);
  };

  const handleInfoChange = (event) => {
    const newInfo = event.target.value.substring(0, maxInfoLength);
    setInfo(newInfo);
  };

  const handlePriceChange = (event) => {
    const newPrice = isNaN(Number(event.target.value)) ? '' : event.target.value;
    setPrice(newPrice);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file || !name || !description || !price || !info) {
      setError('Please fill in all fields');
      return;
    }
    if (price < 0) {
      setError("Can't sell for negative amount");
      return;
    }

    let sellerNumber;

    try {
      const response = await fetch(`${BASE_URL80}/CheckSellerNumber`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch sellerNumber');
      }
  
      const data = await response.json();
      // console.log("LISÄ** DARTAA: ", data)
      sellerNumber = data.sellerNumber;
      // console.log("LISÄ** DARTasdasdAA: ", data.sellerNumber)
      // console.log("LISÄ** DARTasdasdaAA: ", data.sellerNumber)
      // console.log("LISÄ** DARTAdsadasdasdasdA: ", data.sellerNumber)
      // console.log("LISÄ** DARTasdasdAA: ", data.sellerNumber)
      // console.log("LISÄ** DARTasdasdaAA: ", data.sellerNumber)
      // console.log("LISÄ** DARTAdsadasdasdasdA: ", data.sellerNumber)
      // console.log("LISÄ** DARTasdasdAA: ", data.sellerNumber)
      // console.log("LISÄ** DARTasdasdaAA: ", data.sellerNumber)
      // console.log("LISÄ** DARTAdsadasdasdasdA: ", data.sellerNumber)
      // console.log(sellerNumber);
    } catch (error) {
      console.error('Error fetching sellerNumber:', error);
      setError('Error uploading the file. Please try again 999988.');
      return;
    }

  // Now, you can include sellerNumber in the form data
  const formData = new FormData();
  formData.append('image', file);
  formData.append('name', name);
  formData.append('description', description);
  formData.append('info', info);
  formData.append('price', price);
  formData.append('currency', currency);
  formData.append('sellerNumber', sellerNumber);

    fetch(`${BASE_URL81}/upload`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setImageUrl(data.imageUrl);
        setPreviewUrl(''); // Clear preview after successful upload
        setError(''); // Clear any previous error message

        // Invoke the callback to handle submit success
        onSubmitSuccess();
      })
      .catch((error) => {
        console.log('Error:', error);
        setError('Error uploading the file. Please try again.');
      });
  };

  useEffect(() => {
    if (file && isSmallScreen) {
      // console.log('Adjusting image size for small screens');
    } else if (file) {
      // console.log('Using default image size for larger screens');
    }
  }, [file, isSmallScreen]);

  return (
    <div>
      <h1>Upload Image</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" name="image" onChange={handleFileChange} />

        {/* Display the preview of the selected image */}
        {previewUrl && (
          <div>
            <img
              src={previewUrl}
              alt="Preview"
              style={{ maxWidth: '300px', maxHeight: '300px' }}
            />
          </div>
        )}

        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
            maxLength={maxNameLength}
            style={{ width: nameFieldWidth, height: nameFieldHeight }}
          />
          <span>{`${name.length}/${maxNameLength}`}</span>
        </div>
        <div>
          <textarea
            name="description"
            placeholder="Description"
            value={description}
            onChange={handleDescriptionChange}
            maxLength={maxDescriptionLength}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = Math.max(minDescriptionHeight, e.target.scrollHeight) + 'px';
            }}
            style={{ width: descriptionFieldWidth, minHeight: descriptionFieldMinHeight }}
          ></textarea>
          <span>{`${description.length}/${maxDescriptionLength}`}</span>
        </div>
        <div>
          <textarea
            name="info"
            placeholder="Contact info"
            value={info}
            onChange={handleInfoChange}
            maxLength={maxInfoLength}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = Math.max(minInfoHeight, e.target.scrollHeight) + 'px';
            }}
            style={{ width: infoFieldWidth, minHeight: infoFieldMinHeight }}
          ></textarea>
          <span>{`${info.length}/${maxInfoLength}`}</span>
        </div>
        <div>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={price}
            onChange={handlePriceChange}
            style={{ width: priceFieldWidth, height: priceFieldHeight }}
          />
          <select name="currency" value={currency} onChange={handleCurrencyChange}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
        <input type="submit" value="Upload" />
      </form>

      {imageUrl && (
        <div>
          <img
            src={imageUrl}
            alt="Uploaded"
            style={{
              maxWidth: '300px',
              maxHeight: '300px',
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </div>
      )}

      {/* Display the error message */}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default UploadFile;
