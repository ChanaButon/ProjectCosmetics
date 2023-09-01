// businessLogin.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import the useLocation hook

const BusinessLogin = () => {
  // Use the useLocation hook to get the location object
  const location = useLocation();
  const {product} = location.state || {};
  console.log(product);

  // State to manage prices for selected treatments
  const [treatmentPrices, setTreatmentPrices] = useState({});

  // Function to handle changes in treatment prices
  const handlePriceChange = (treatment, price) => {
    setTreatmentPrices((prevPrices) => ({
      ...prevPrices,
      [treatment]: price,

    }));
    console.log(treatmentPrices);
  };

  return (
    <div>
      <h1>  ברוכה הבאה {product.Name}</h1>
      <h2>הקש מחירון לכל התמחות:</h2>
      {<ul>
        {product.TreatmantName && product.TreatmantName.length > 0 ? (
          product.TreatmantName.map((treatment, index) => (
            <li key={index}>
              {treatment}
              <input
                type="text"
                placeholder="Enter Price"
                onChange={(e) => handlePriceChange(treatment, e.target.value)}
                value={treatmentPrices[treatment] || ''}
              />
            </li>
          ))
        ) : (
          <p>No treatments selected.</p>
        )}
      </ul> }
    </div>
  );
};

export default BusinessLogin;
