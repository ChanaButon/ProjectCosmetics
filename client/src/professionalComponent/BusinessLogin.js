//import { statSync } from 'fs';
import React, { useState ,useRef, useEffect} from 'react';
import { useLocation } from 'react-router-dom'; // Import the useLocation hook
import axios from 'axios'
//import { connect } from 'react-redux'



const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const statusOptions = ['true', 'false'];

const BusinessLogin = () => {
  // Use the useLocation hook to get the location object
  const location = useLocation();
  const {product} = location.state || {};


  const AllList = async () => {
    const treatmantServer = await fetch("http://localhost:3321/treatmant/getTreatmant");
    const data = await treatmantServer.json();
    setTreatmant(data);
  };

  useEffect (()=>{
    AllList();
  },[]);

  const selectedDayRef = useRef('Sunday');
  const  startTimeRef= useRef('null')
  const  finishTimeRef= useRef('null')
  const statusRef = useRef('true');
  const startDateRef = useRef('null');
  const endDateRef = useRef('null');

  // State to manage prices for selected treatments
  const [treatmantList, setTreatmant] = useState([]);
  const [treatmentTime, setTreatmentTime] = useState({});

  // Function to handle changes in treatment prices
  const handlePriceChange = (treatmant, price) => {
    // setTreatmentPrices((prevPrices) => ({
    //   ...prevPrices,
    //   [treatment]: price,

    // }));
    // console.log(treatmentPrices);
    setTreatmant([...treatmantList,{"TreatmantName":treatmant,"Price":price}])
    console.log(treatmantList)

  };
  const handleTimeChange = (treatment, time) => {
    setTreatmentTime((prevTime) => ({
      ...prevTime,
      [treatment]: time,

    }));
    console.log(treatmentTime);
  };

  // State to store the list of day objects
 const [dayList, setDayList] = useState([]);
 const [freeDaysList,setFreeDayList]=useState([]);
 const [businessDescription, setBusinessDescription] = useState('');
 const [businessAddress, setBusinessAddress] = useState('');
// const [locationIconUrl, setLocationIconUrl] = useState('');


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

   const handelADDFreeDays=()=>{

    const newFreeDays={
      StartDate:startDateRef.current.value,
      EndDate:endDateRef.current.value,
    }

    setFreeDayList((prevList) =>[...prevList, newFreeDays]);
    StartDate:startDateRef.current.value='';
    EndDate:endDateRef.current.value='';

   }

 
 




  const submitUser = () =>{
    // Now, you can use the dayList array for further processing
    // console.log(dayList);

    // Send the dayList data to your API or perform other actions here

    // Clear the dayList after submitting if needed
    setDayList([]);
    setFreeDayList([]);

    }
    console.log(dayList)

    axios.post('http://localhost:3321/timeDay/newTimeDay',dayList).then((res) => {
      if (res.data) {
        // console.log(res);
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
                value={treatmantList["TreatmantName"] || ''}
              />
              <input
                type="text"
                placeholder="זמן טיפול"
                onChange={(e) => handleTimeChange(treatment, e.target.value)}
                value={treatmentTime[treatment] || ''}
              />
              
            </li>
          ))
        ) : (
          <p>No treatments selected.</p>
        )}
      </ul> }
      <h2>תיאור העסק</h2>
      <textarea
       placeholder="BusinessDescription" value={businessDescription} onChange={(e) => setBusinessDescription(e.target.value)} />

{/* Display the business description */}
{/* <p>{businessDescription}</p> */}
      <h2>כתובת העסק</h2>
      <input placeholder="Business Address" value={businessAddress} onChange={(e) => setBusinessAddress(e.target.value)}/>
      {/* Display the business address */}
      <p>Address: {businessAddress}</p>

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
      <input  ref={startDateRef}  placeholder="StartDate" id="StartDateInput" className={`aaa bbb`} type="date"/>
      <input ref={endDateRef} placeholder="EndDate" id="EndDateInput" className={`aaa bbb`} type="date"/>

     
      <button onClick={handelADDFreeDays} color="pink">
        Add FreeDays
      </button>

      
      <u1>
      {freeDaysList.map((freeDays, index) => (
          <li key={index}>
            FreeDay: Start: {freeDays.StartDate}, End: {freeDays.EndDate}
          </li>
            ))}
        </u1>

      <input   placeholder="BrakeTime" id="BrakeTimeInput" className={`aaa bbb`} type="number"/>



{/* <h2>Location Icon</h2>
<input
  placeholder="Location Icon URL"
  value={locationIconUrl}
  onChange={(e) => setLocationIconUrl(e.target.value)}
/> */}



{/* Display the location icon
{locationIconUrl && (
  <img
    src={locationIconUrl}
    alt="Location Icon"
    style={{ width: '50px', height: '50px' }}
  />
)} */}

      





     
      <button onClick={submitUser} color="pink">
        Submit
      </button>
    </div>
      
   
  );
  }






export default BusinessLogin;
