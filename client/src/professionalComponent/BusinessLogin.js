// businessLogin.js

import { statSync } from 'fs';
import React, { useState ,useRef} from 'react';
import { useLocation } from 'react-router-dom'; // Import the useLocation hook
import axios from 'axios'
import { connect } from 'react-redux'



const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const statusOptions = ['true', 'false'];

const BusinessLogin = () => {
  // Use the useLocation hook to get the location object
  const location = useLocation();
  const {product} = location.state || {};
  console.log(product);

  const selectedDayRef = useRef('Sunday');
  const  startTimeRef= useRef('null')
  const  finishTimeRef= useRef('null')
  const statusRef = useRef('true');

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

  // State to store the list of day objects
 const [dayList, setDayList] = useState([]);

  // Function to handle adding a new day to the list
  const handleAddDay = () => {
    // Get the values from the input fields
    const newDay = {
      Day: selectedDayRef.current.value,
      Start: startTimeRef.current.value,
      End: finishTimeRef.current.value,
      Status: statusRef.current.value,
    };

    // Add the newDay to the dayList array
    setDayList((prevList) => [...prevList, newDay]);
     // Clear the input fields after adding a day
     selectedDayRef.current.value = '';
     startTimeRef.current.value = '';
     finishTimeRef.current.value = '';
     statusRef.current.value = 'true'; // Reset status to the default value
   };
 
 




  const submitUser = () =>{
    // Now, you can use the dayList array for further processing
    console.log(dayList);

    // Send the dayList data to your API or perform other actions here

    // Clear the dayList after submitting if needed
    setDayList([]);

    }
    console.log(dayList)

    axios.post('http://localhost:3321/timeDay/newTimeDay',dayList).then((res) => {
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
       {/* Your day input fields */}
      <select   ref={selectedDayRef} placeholder='Day' id="DayInput"  className={`aaa bbb`} type="text" >
      {daysOfWeek.map((day, index) => (
          <option key={index} value={day}>
            {day}
          </option>
        ))}
      </select>
      <input  ref={startTimeRef} placeholder='StaartTime' id="StartTimeInput"  className={`aaa bbb`} type="time" />
      <input  ref={finishTimeRef} placeholder='FinishTime' id="FinishTimeInput"  className={`aaa bbb`} type="time" />
      <select  ref={statusRef}  placeholder='Status' id="StatusInput"  className={`aaa bbb`} >
      {statusOptions.map((status, index) => (
          <option key={index} value={status}>
            {status}
          </option>
        ))}
      </select>

      <button onClick={handleAddDay} color="pink">
        Add Day
      </button>

      {/* Display the list of added days */}
      <ul>
        {dayList.map((day, index) => (
          <li key={index}>
            Day: {day.Day}, Start: {day.Start}, End: {day.End}, Status: {day.Status}
          </li>
        ))}
      </ul>


     
      <button onClick={submitUser} color="pink">
        Submit
      </button>
    </div>
      
   
  );
  }



export default BusinessLogin;
