import React, { useState, useEffect } from "react";
import './style.css';
// import Calendar from 'react-calendar';
import { useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import { useLocation } from 'react-router-dom';
import {  momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Calendar from 'react-calendar';

const QuestionButtons = () => {
  const location = useLocation();
  const { userid } = location.state || {};

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [user, setUser] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dayList, setDayList] = useState([]);
  const [dayweekList, setDayweekList] = useState([]);
  const [deatailUserList, setDeatailUserList] = useState([]);
  const localizer = momentLocalizer(moment);

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
        const foundUser = data.find(a => a.UserID === userid);
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
    setDeatailUserList((prevUser) => ({ ...prevUser, WorkingDay: connectedList }));
  };

  useEffect(() => {
    if (dayweekList.length > 0) {
      updateDetail();
      // setIsDataLoaded(true);
    }
    if(deatailUserList.length!==0){
      console.log(deatailUserList)
      console.log("yessssssssssssssssss")
      setIsDataLoaded(true);
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
    // ... your existing logic for rendering buttons
  };

  
  
  const events = () => {
    if (isDataLoaded) {
      const workingDayEvents = deatailUserList.WorkingDay.map(day => ({
        title: 'Working Day',
        start: moment().day(day.Day).hour(day.Start).toDate(),
        end: moment().day(day.Day).hour(day.End).minute(0).toDate(),
      }));
      console.log(workingDayEvents);
      return workingDayEvents;
    }
    return [];
  };
  
  // const customDayFormatter = (locale, date) => {
  //   if (isDataLoaded) {
  //   const workingDay = deatailUserList.WorkingDay.map(day =>{return day.Day});
  //   const workingDayNumbers = workingDay.map(dayName => moment().day(dayName).day());
  //   console.log(workingDayNumbers)
  //   console.log(workingDay)
    
    
  //   const dayOfWeek = date.getDay();
  //   if (workingDayNumbers.includes(dayOfWeek)) {
  //     const options = { day: 'numeric',weekday: 'short' };
  //     return new Intl.DateTimeFormat(locale, options).format(date);
  //   }
  //   else{
  //     return []
  //   }
  // };
  // }
  
  const tileDisabled = ({ activeStartDate, date, view }) => {
    if (view === 'month' && isDataLoaded) {
      const workingDay = deatailUserList.WorkingDay.map(day => day.Day);
      const workingDayNumbers = workingDay.map(dayName => moment().day(dayName).day());
      const dayOfWeek = date.getDay();
      return !workingDayNumbers.includes(dayOfWeek);
    }
    return false;
  };

  return (
    <div style={{ display: "inline-flex", flexDirection: "column" }}>
      <button onClick={googleSignIn}>Sign In</button>
      <div className="chat-container">
        <div className="chat-header ">
          <h2>CHAT</h2>
        </div>

        <Calendar onChange={setSelectedDate} value={selectedDate} minDate={new Date()} maxDate={twoWeeksFromNow}   tileDisabled={tileDisabled} />
{/* 
        <Calendar
        localizer={localizer}
        // events={events()}
        startAccessor="start"
        endAccessor="end"
        minDate={new Date()}
        style={{ margin: '20px' }}
      /> */}

        <div className="chat-body">
          <h3>Select a time:</h3>
          <button className="message-bubble other" onClick={() => setSelectedQuestion("morning")}>Morning</button>
          <button className="message-bubble other" onClick={() => setSelectedQuestion("noon")}>Noon</button>
          <button className="message-bubble other" onClick={() => setSelectedQuestion("evening")}>Evening</button>
        </div>
        {renderButtons()}
      </div>
    </div>
  );
};

export default QuestionButtons;
