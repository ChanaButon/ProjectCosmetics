import React, { useState, useEffect } from "react";
import './style.css';
// import Calendar from 'react-calendar';
import { useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import { useLocation } from 'react-router-dom';
// import {  momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Calendar from 'react-calendar';
import EarliestAvailableTime from "./EarliestAvailableTime";
import {  addToQueueApi } from "./api"

const QuestionButtons = () => {
  const location = useLocation();
  const { userid,filteredTreatm,allTreat,userSend } = location.state || {};
  const [earliestTime, setEarliestTime] = useState("Loading...");
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [user, setUser] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dayList, setDayList] = useState([]);
  const [dayweekList, setDayweekList] = useState([]);
  const [deatailUserList, setDeatailUserList] = useState([]);
  const [addToQueue, setAddToQueue] = useState(false);

  const supabase = useSupabaseClient();
  const { isLoading } = useSessionContext();

   // Calculate the date two weeks from now
 const twoWeeksFromNow = new Date();
 twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);


  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3321/product/getProducts');
      if (response.ok) {
        const data = await response.json();
        const foundUser = data.find(a => a._id === userid);
        setUser(foundUser)
        if (foundUser) {
          const dayPromises = foundUser.WorkingDay.map(async (b) => {
            const dayResponse = await fetch(`http://localhost:3321/timeDay/findDayById:${b}`);
            const dayData = await dayResponse.json();
            return dayData;
          });
          const dayResults = await Promise.all(dayPromises);
          setDayList(dayResults);

          const dayWeekPromises = dayResults.map(async (elemnt) => {
            const dayWeekResponse = await fetch(`http://localhost:3321/days/findDayWeekById:${elemnt.id.Day}`);
            const dayWeekData = await dayWeekResponse.json();
            return dayWeekData;
          });
          const dayWeekResults = await Promise.all(dayWeekPromises);
          setDayweekList(dayWeekResults);
          console.log(dayWeekResults)
        }
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateDetail = () => {
    const connectedList = dayweekList.map(dayweekItem => {
      const correspondingDay = dayList.find(dayItem => dayItem.id.Day === dayweekItem.id._id);
      if (correspondingDay) {
        return {
          ...correspondingDay.id,
          "Day": dayweekItem.id.DayName
        };
      }
      return null;
    }).filter(item => item !== null);
    setDeatailUserList(user)
    setDeatailUserList((prevUser) => ({ ...prevUser, WorkingDay: connectedList,TreatmantID:allTreat }));
  };

  useEffect(() => {
    if (dayweekList.length > 0) {
      updateDetail();
    }
    if(deatailUserList.length!==0){
      setIsDataLoaded(true);
      console.log(deatailUserList)
      console.log("yessssssssssssssssss")
    }
  }, [dayweekList]);

  const googleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar'
      }
    });

    if (error) {
      alert("Error signing in with Google.");
      console.error(error);
    }
  };

  const renderButtons = () => {
    if (isDateSelected && selectedTimeOfDay === null) {
    return (
        <div className="chat-body">
          <h3>Select a time:</h3>
          <button className="message-bubble other" onClick={() => setSelectedTimeOfDay("morning")}>Morning</button>
          <button className="message-bubble other" onClick={() => setSelectedTimeOfDay("noon")}>Noon</button>
          <button className="message-bubble other" onClick={() => setSelectedTimeOfDay("evening")}>Evening</button>
        </div>
      );
    } else if (isDateSelected && selectedTimeOfDay !== null) {
      // Determine the user's earliest available time for the selected time of day
      // const earliestTime = determineEarliestTime(selectedTimeOfDay);
      return (
        <div className="chat-body">
          <h3>Selected Time of Day: {selectedTimeOfDay}</h3>
          <h3>Earliest Available Time: </h3>
        </div>
      );
    } else {
      return (
        <div className="calendar-container">
          <Calendar onChange={handleDateSelection} value={selectedDate} minDate={new Date()} maxDate={twoWeeksFromNow} tileDisabled={tileDisabled} locale="en-US"  />
        </div>
      );
    }
  };
  
  
  const addToQueueHandler = async () => {
    console.log("מקשרררררררררררררררררררררררר")
    const [hourString, minuteString] = earliestTime.split(":");
    const hour = parseInt(hourString, 10);
    const minute = parseInt(minuteString, 10);
    const date = selectedDate; 
    date.setHours(hour); 
    date.setMinutes(minute)
    console.log(date);
    try {
      const message = await addToQueueApi(date,filteredTreatm,userSend._id,deatailUserList._id);
      console.log(message); // Handle the success message (e.g., show a success notification to the user)
    } catch (error) {
      console.error('Error adding user to the queue:', error); // Handle errors (e.g., show an error message to the user)
    }
  };
  
  
  
  const tileDisabled = ({ activeStartDate, date, view }) => {
    if (view === 'month' && isDataLoaded) {
      const workingDay = deatailUserList.WorkingDay.map(day => day.Day);
      const workingDayNumbers = workingDay.map(dayName => moment().day(dayName).day());
      const dayOfWeek = date.getDay();
      return !workingDayNumbers.includes(dayOfWeek);
    }
    return false;
  };

  const handleDateSelection = (date) => {
    setSelectedDate(date);
    setIsDateSelected(true);
  };
  const handleEarliestTimeChange = (time) => {
    // console.log( selectedDate.setHours(time))
    setEarliestTime(time);
  };

  return (
    <div style={{ display: "inline-flex", flexDirection: "column" }}>
    <button onClick={googleSignIn}>Sign In</button>
    <div className="chat-container">
      <div className="chat-header ">
        <h2>CHAT</h2>
      </div>
      {renderButtons()}
        {isDateSelected && selectedTimeOfDay !== null && (
          <EarliestAvailableTime selectedDate={selectedDate} deatailUserList={deatailUserList} selectedTimeOfDay = {selectedTimeOfDay} allTreat= {allTreat} onEarliestTimeChange={handleEarliestTimeChange} />
        
          )}
           {isDateSelected && selectedTimeOfDay !== null && (
            <button onClick={addToQueueHandler}>Add to Queue</button>)}

    </div>
  </div>

  );
};

export default QuestionButtons;
