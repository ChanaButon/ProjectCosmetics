//import { statSync } from 'fs';
import React, { useState ,useRef, useEffect} from 'react';
import { useLocation } from 'react-router-dom'; // Import the useLocation hook
import axios from 'axios'
//import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './BusinessLogin.css'


const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const statusOptions = ['true', 'false'];

const BusinessLogin = () => {
  // Use the useLocation hook to get the location object
  const location = useLocation();
  const navigate = useNavigate()


  const {product,idUser} = location.state || {};
 // console.log(idUser)
  //console.log(product)




  
  
  const selectedDayRef = useRef('Sunday');
  const  startTimeRef= useRef('null')
  const  finishTimeRef= useRef('null')
  const statusRef = useRef('true');
  const startDateRef = useRef('null');
  const endDateRef = useRef('null');
  const BrakeTimeRef=useRef('null');

  // State to manage prices for selected treatments
  const [treatmantList, setTreatmant] = useState([]);
  const [treatmentTime, setTreatmentTime] = useState({});
  const [treatmant, settreatmant] = useState("");

  const handlePriceChange = (treatmentName, price) => {
    const updatedTreatmentList = [...treatmantList];
    const existingTreatmentIndex = updatedTreatmentList.findIndex(
      (treatment) => treatment.TreatmantName === treatmentName
    );
    if (existingTreatmentIndex !== -1) {
      console.log(treatmentTime)
      // Update an existing treatment's price
      updatedTreatmentList[existingTreatmentIndex].Price = price;
      updatedTreatmentList[existingTreatmentIndex].TreatmantTime= treatmentTime[treatmentName] || ''
    } else {
      // Create a new treatment entry
      updatedTreatmentList.push({
        TreatmantName: treatmentName,
        Price: price,
        TreatmantTime: treatmentTime[treatmentName] || '', // Add treatment time
      });
    }

setTreatmant(updatedTreatmentList);
  };
  
const handleTimeChange = (treatmentName, time) => {
  console.log(time)
  setTreatmentTime((prevTime) => ({
    ...prevTime,
    [treatmentName]: time,
  }));
  settreatmant(treatmentName)
};

useEffect(()=>{
 const updateTreatment = treatmantList.find((treatment) => treatment.TreatmantName===treatmant)
 if(updateTreatment){
 handlePriceChange(treatmant, updateTreatment.Price);
 }
},[treatmentTime])

  // State to store the list of day objects
 const [dayList, setDayList] = useState([]);
 const [freeDaysList,setFreeDayList]=useState([]);
 const [businessDescription, setBusinessDescription] = useState('');
 const [businessAddress, setBusinessAddress] = useState('');
// const [locationIconUrl, setLocationIconUrl] = useState('');

const handleExitClick = () => {
  navigate('/Login'); // Navigate to the main page
};

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

console.log(typeof(freeDaysList))
let product = {
  UserID : idUser,
  Describe:businessDescription,
  Addres:businessAddress,
  TreatmantID:treatmantList,
  Customers:[],
  WorkingDay:dayList,
  HoliDay:freeDaysList,
  BrakeTime:BrakeTimeRef.current.value,
  QueueList:[],
  
}
alert("העסק נוסף בהצלחה")
console.log(product);


axios.post('http://localhost:3321/product/newProduct',product).then((res) => {
  if (res.data) {
   console.log(res.data);

    //עדכון לסטור
  // dispatch(setUser(res.data.newProduct))
  // navigate("/BusinessLogin",{state:{product}});
  }
  }).catch((err) => {
  console.log(err);
  alert("אירעה שגיאה")
  }) 

    setDayList([]);
    setFreeDayList([]);

    }
    //console.log(dayList)

    axios.post('http://localhost:3321/timeDay/newTimeDay',dayList[0]).then((res) => {
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
    <div className="component-container">
     <button className="exit-button" onClick={handleExitClick}>
      X
    </button>
    <h1 className="title1">ברוכה הבאה {product.Name}</h1>
    <h2 className="subtitle">הקש מחירון לכל התמחות:</h2>
    <ul className="treatments-list">
      {product.TreatmantName && product.TreatmantName.length > 0 ? (
        product.TreatmantName.map((treatment, index) => (
          <li key={index} className="treatment-item">
            {treatment}
            <input
              className="input-field"
              type="text"
              placeholder="הכנס מחיר"
              onChange={(e) => handlePriceChange(treatment, e.target.value)}
            />
            <input
              className="input-field"
              type="text"
              placeholder="זמן טיפול"
              onChange={(e) => handleTimeChange(treatment, e.target.value)}
            />
          </li>
        ))
      ) : (
        <p>No treatments selected.</p>
      )}
    </ul>
    <h2 className="subtitle">תיאור העסק</h2>
    <textarea
      className="input-field"
      placeholder="תיאור העסק"
      value={businessDescription}
      onChange={(e) => setBusinessDescription(e.target.value)}
    />
    <h2 className="subtitle">כתובת העסק</h2>
    <input
      className="input-field"
      placeholder="כתובת העסק"
      value={businessAddress}
      onChange={(e) => setBusinessAddress(e.target.value)}
    />
   
    <h2 className="subtitle">ימי עבודה</h2>
    
      {/* options for days of the week */}
    
       <select   ref={selectedDayRef} placeholder='Day' id="DayInput"  className={`aaa bbb`} type="text" >
      {daysOfWeek.map((day, index) => (
          <option key={index} value={day}>
            {day}
      
          </option>
       )) }
    </select>
    <input
      ref={startTimeRef}
      className="input-field"
      placeholder="Start Time"
      id="StartTimeInput"
      type="time"
    />
    <input
      ref={finishTimeRef}
      className="input-field"
      placeholder="Finish Time"
      id="FinishTimeInput"
      type="time"
    />
    <select ref={statusRef} className="input-field" placeholder="Status" id="StatusInput">
    {statusOptions.map((status, index) => (
          <option key={index} value={status}>
            {status}
          </option>
        ))}
      </select>
    <button className="button1" onClick={handleAddDay}>
     הוסף יום
    </button>
    <ul className="added-days-list">
      {dayList.map((day, index) => (
        <li key={index} className="day-item">
          Day: {day.Day}, Start: {day.Start}, End: {day.End}, Status: {day.Status}
        </li>
      ))}
    </ul>
    <h2 className="subtitle">ימים חופשים </h2>
    <input ref={startDateRef} className="input-field" placeholder="תחילת התאריך" type="date" />
    <input ref={endDateRef} className="input-field" placeholder="סיום התאריך" type="date" />
    <button className="button1" onClick={handelADDFreeDays}>
     הוסף יום חופש
    </button>
    <ul className="free-days-list">
      {freeDaysList.map((freeDays, index) => (
        <li key={index} className="free-day-item">
          FreeDay: Start: {freeDays.StartDate}, End: {freeDays.EndDate}
        </li>
      ))}
    </ul>
    <h2 className="subtitle">זמן הפסקה</h2>
    <input ref={BrakeTimeRef} className="input-field" placeholder="זמן הפסקה" type="number" />
    <button className="button1" onClick={submitUser}>
      אישור
    </button>
  </div>
      
   
  );
  }






export default BusinessLogin;
