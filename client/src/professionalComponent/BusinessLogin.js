// businessLogin.js

import { statSync } from 'fs';
import React, { useState ,useRef} from 'react';
import { useLocation } from 'react-router-dom'; // Import the useLocation hook
import axios from 'axios'
import { connect } from 'react-redux'



const BusinessLogin = () => {
  // Use the useLocation hook to get the location object
  const location = useLocation();
  const {product} = location.state || {};
  console.log(product);



  const dayRef = useRef('null')
  const  startTimeRef= useRef('null')
  const  finishTimeRef= useRef('null')
  const  statusRef= useRef('null')

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



  const submitUser = () =>{

    let userbusiness ={
      Day:dayRef.current.value,
      Start:startTimeRef.current.value,
      End:finishTimeRef.current.value,
      Status:statusRef.current.value,

        


    }
    console.log(userbusiness)

    axios.post('http://localhost:3321/timeDay/newTimeDay',userbusiness).then((res) => {
      if (res.data) {
        console.log(res);
        //עדכון לסטור
        // dispatch(setUser(res.data.newProduct))
        // navigate("/BusinessLogin",{state:{product}});
      }
    }).catch((err) => {
      console.log(err);
      alert("אירעה שגיאה")
    })
    

  }

  


  

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
      <input   ref={dayRef} placeholder='Day' id="DayInput"  className={`aaa bbb`} type="text" />
      <input  ref={startTimeRef} placeholder='StaartTime' id="StartTimeInput"  className={`aaa bbb`} type="time" />
      <input  ref={finishTimeRef} placeholder='FinishTime' id="FinishTimeInput"  className={`aaa bbb`} type="time" />
      <input  ref={statusRef}  placeholder='Status' id="StatusInput"  className={`aaa bbb`} type="bit" />
      {/* {{formErrors.familyName && <span className="error-text">שדה חובה</span>} } */}
      <button onClick={submitUser} color='pink'>Submit</button>
      
      



    </div>
  );
};

export default BusinessLogin;
