import React, { useEffect,useState } from "react";
import './style.css'
import { googleSignIn } from './googleCalendar/googleCalnedar';
import DateTimePicker from 'react-datetime-picker';
import axios, { all } from 'axios';
import Calendar from 'react-calendar';
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import { useLocation } from 'react-router-dom';
function QuestionButtons() {
  	
const location = useLocation();
const {userid} = location.state || {};
// console.log(userid)
  // State to store the selected question
  const [selectedQuestion, setSelectedQuestion] = useState(null);
const [activeButton, setActiveButton] = useState(null);
const [user1, setuser] = useState(false);
const [allDetail, setallDetail] = useState({});
const [start, setStart] = useState(new Date);
const [end, setEnd] = useState(new Date);
const [eventName, setEventName] = useState("");
const [eventDescription, setEventDescription] = useState("");
const [selectedDate, setSelectedDate] = useState(new Date());
const session = useSession();
const supabase = useSupabaseClient();
const { isLoading } = useSessionContext();
const [dayList, setDayList] = useState([]);
const [dayweekList, setDayweekList] = useState([]);
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


const updateDetail = ()=>{
  console.log("hiii")
  const connectedList = dayweekList.map(dayweekItem => {
  const correspondingDay = dayList.find(dayItem => dayItem.id.Day === dayweekItem.id._id);
  if (correspondingDay) {
    return {
      ...correspondingDay.id,
      "Day":dayweekItem.id.DayName
    };
  }})
console.log(connectedList)
setallDetail(user1)
setallDetail((prev) => ({ ...prev, WorkingDay: connectedList }))
}
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3321/product/getProducts', {
        method: 'GET',
        headers: {'Content-Type': 'application/json',},
      });
      if (response.ok) {
        const data = await response.json();
        const foundUser = data.find(a => a.UserID === userid);
        setuser(foundUser)
        if (foundUser) {
          const dayPromises = foundUser.WorkingDay.map(async (b) => {
            const dayResponse = await fetch(`http://localhost:3321/timeDay/findDayById:${b}`, { method: 'GET' });
            const dayData = await dayResponse.json();
            return dayData;
          });
          const dayResults = await Promise.all(dayPromises);
          setDayList(dayResults);

          const dayWeek = dayResults.map(async(elemnt)=>{
            const dayWeekResponse = await fetch(`http://localhost:3321/days/findDayWeekById:${elemnt.id.Day}`, { method: 'GET' });
            const dayWeekData = await dayWeekResponse.json();
            return dayWeekData;
          })
            const dayWeekResults = await Promise.all(dayWeek);
            setDayweekList(dayWeekResults)
        }
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };

  fetchData(); // Call the async function directly inside useEffect

}, []); // Empty dependency array means this effect runs once after the initial render


useEffect(() => {
  if(dayweekList.length>0){
    updateDetail()
  }
  console.log(allDetail)

}, [dayweekList]);


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