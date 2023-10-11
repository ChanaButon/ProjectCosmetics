import React, { useEffect,useState } from "react";
import './style.css'
import { googleSignIn } from './googleCalendar/googleCalnedar';
import DateTimePicker from 'react-datetime-picker';
import axios from 'axios';
import Calendar from 'react-calendar';
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import { useLocation } from 'react-router-dom';
function QuestionButtons() {
  	
const location = useLocation();
const {userid} = location.state || {};
console.log(userid)
  // State to store the selected question
  const [selectedQuestion, setSelectedQuestion] = useState(null);
const [activeButton, setActiveButton] = useState(null);
const [user1, setuser] = useState();
const [start, setStart] = useState(new Date);
const [end, setEnd] = useState(new Date);
const [eventName, setEventName] = useState("");
const [eventDescription, setEventDescription] = useState("");
const [selectedDate, setSelectedDate] = useState(new Date());
const session = useSession();
const supabase = useSupabaseClient();
const { isLoading } = useSessionContext();
 // Calculate the date two weeks from now
 const twoWeeksFromNow = new Date();
 twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);

 // Function to handle button click
 const handleButtonClick = (question) => {
   setSelectedQuestion(question);
 };
 const handleDateChange = (date) => {
  setSelectedDate(date);
}

const detailDay = ()=>{
  //setSelectedDate(date);
///  user.
  // fetch(`http://localhost:3321/timeDay/findDayById/${id}`, {method: 'GET', headers: {'Content-Type': 'application/json',},}).then(response=>{return response.json();}).then(data=>{console.log(data)})
}

const detail = ()=>{
  fetch('http://localhost:3321/product/getProducts', {method: 'GET', headers: {'Content-Type': 'application/json',},})
.then(response => {
  if (response.ok) {
    return response.json();
  }
  throw new Error('Network response was not ok.');
})
.then(data => {
  console.log(data);
  data.map((a)=>{
    if (a.UserID===userid){
      console.log(a)
      // a.WorkingDay.map((b)=>{
      //   console.log(b)
      //   detailDay(b)
      //})
    setuser(a)
    }
  })
})
.catch(error => {
  console.error('There has been a problem with your fetch operation:', error);
});
console.log(user1)
};

useEffect(() => {
  detail();
  if(user1!==undefined){
    console.log(user1)
  }
}, []);


  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar'
      }
    });

    if (error) {
      alert("error");
      console.log(error);
    }
  }
  
  // Function to render dynamic buttons based on selected question
  const renderButtons = () => {
    switch (selectedQuestion) {
      case "morning":
        return (
          <>
            <button className="message-bubble other">8:00 AM</button>
            <button className="message-bubble other">9:00 AM</button>
            <button className="message-bubble other">10:00 AM</button>
          </>
        );
      case "noon":
        return (
          <>
            <button className="message-bubble other">12:00 PM</button>
            <button className="message-bubble other">1:00 PM</button>
            <button className="message-bubble other">2:00 PM</button>
          </>
        );
      case "evening":
        return (
          <>
            <button className="message-bubble other">6:00 PM</button>
            <button className="message-bubble other">7:00 PM</button>
            <button className="message-bubble other">8:00 PM</button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ display: "inline-flex", flexDirection: "column" }}>
      <button onClick={googleSignIn}>Sign In</button>
      <div className="chat-container">
        <div className="chat-header ">
          <h2>CHAT</h2>
        </div>

        <Calendar onChange={handleDateChange} value={selectedDate} minDate={new Date()} maxDate={twoWeeksFromNow} />

        <div className="chat-body">
          <h3>Select a time:</h3>
          <button  className="message-bubble other" onClick={() => handleButtonClick("morning")}>Morning</button>
          <button className="message-bubble other" onClick={() => handleButtonClick("noon")}>Noon</button>
          <button className="message-bubble other" onClick={() => handleButtonClick("evening")}>Evening</button>
        </div >
        {renderButtons()}
      </div>
    </div>


  );
}

export default QuestionButtons;