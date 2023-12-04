import React, { useState, useEffect } from "react";
import './Chat.css';
import axios from 'axios';
// import Calendar from 'react-calendar';
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import { redirect, useLocation } from 'react-router-dom';
// import {  momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Calendar from 'react-calendar';
import EarliestAvailableTime from "./EarliestAvailableTime";
import {  addToQueueApi } from "./api"
import {handleJoinWaitingListClick} from "./api"
import {checkWaitList} from './api'
import { useNavigate } from 'react-router-dom';
import HomeClient from "../../clientComponent/HomeClient";
import {  RxExit } from 'react-icons/rx';
import * as twilio from 'twilio';


const QuestionButtons = () => {
  const navigate = useNavigate(); // Use useNavigate for navigation
  const location = useLocation();
  const { value,userid,filteredTreatm,allTreat,userSend } = location.state || {};
  console.log(value)
  const [earliestTime, setEarliestTime] = useState("Loading...");
  const [selectedAppointmentTime, setSelectedAppointmentTime] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(false);
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

  const session = useSession();
  const supabase = useSupabaseClient();
  const { isLoading } = useSessionContext();

    const handleExitClick = () => {
      navigate(-1);
       };
       const handleBackClick = () => {
        navigate(-0);
         };

 
  async function createCalendarEvent(date) {
    const initialDate = new Date(date.toISOString());
    // Adding 30 minutes
    initialDate.setMinutes(initialDate.getMinutes() + filteredTreatm.TreatmantTime);
    const newDate = initialDate.toISOString(); // Formatted as ISO string ('YYYY-MM-DDTHH:MM:SS.SSSZ')
    console.log(newDate);

    const event = {
      "summary": filteredTreatm.TreatmantName,
      // "description": eventDescription,
      "start": {
        "dateTime": date.toISOString(),
        "timeZone": Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      "end": {
        "dateTime":newDate,
        "timeZone": Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    }
    console.log(event)
    try {
      await axios.post("https://www.googleapis.com/calendar/v3/calendars/primary/events", event, {
        headers: {
          'Authorization': `Bearer ${session.provider_token}`,
          'Content-Type': 'application/json'
        }
      });
      // console.log(data);
      alert('התור נקבע ב ' + date + ' ב Google Calendar. התור התווסף בהצלחה.');
    } catch (error) {
      console.log(error);
      alert(  date+"התור נקבע ב " +"Google Calrndar"+ 'התור לא התווסף ל')   }
  }

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

 
  
  const renderButtons = () => {
    console.log("earliestTime:", selectedAppointmentTime);
    console.log("isDateSelected:", isDateSelected);
    console.log("selectedTimeOfDay:", selectedTimeOfDay);
    console.log("earliestTime:", earliestTime);
    if (isDateSelected && selectedTimeOfDay === null) {
    return (
        <div className="chat-body">
         
          <h3>:בחירת זמן ביום</h3>
          <button className="message-bubble other" onClick={() => setSelectedTimeOfDay("morning")}>בוקר</button>
          <button className="message-bubble other" onClick={() => setSelectedTimeOfDay("noon")}>צהריים</button>
          <button className="message-bubble other" onClick={() => setSelectedTimeOfDay("evening")}>ערב</button>
        </div>
      );
    } else if (isDateSelected && selectedTimeOfDay !== null) {
      return (
        <div className="chat-body2">
          <h3>:פרטי התור</h3>
          <h7>₪ {filteredTreatm.Price} :מחיר</h7>
          <br></br>
          <h7>סוג טיפול: {filteredTreatm.TreatmantName}</h7>
          <br></br>
          <h7>כתובת: {value.Addres}</h7>
        <h5>:שעה זמינה  </h5>
        <EarliestAvailableTime
          selectedDate={selectedDate}
          deatailUserList={deatailUserList}
          selectedTimeOfDay={selectedTimeOfDay}
          allTreat={allTreat}
          filteredTreatm={filteredTreatm}
          onEarliestTimeChange={setEarliestTime}
          onTimeSelection={handleTimeSelection}
        />
        {selectedAppointmentTime && selectedAppointmentTime.startsWith("אין תור זמין בשעות") ? (
          <div>
            <p>אין תור זמין בשעות אלו</p>
          </div>
        ) : (
          <button className="addQueue" onClick={handleAddToQueueClick}>הוסף תור</button>
        )
        }
        <p>?האם ברצונך להיכנס לרשימת המתנה ולקבל הודעה </p>
            <button className="addQueue" onClick={()=>{handleJoinWaitingListClick(userSend._id,filteredTreatm,selectedDate,selectedTimeOfDay,userSend,value._id)}}>הצטרף לרשימת המתנה</button>
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

    if (selectedAppointmentTime && buttonClicked) {
    const [hourString, minuteString] = selectedAppointmentTime.split(":");
    const hour = parseInt(hourString, 10);
    const minute = parseInt(minuteString, 10);
    console.log(hour,minute)
    const date = selectedDate; 
    date.setHours(hour); 
    date.setMinutes(minute)
    
    try {
      console.log("ftgyhjk")
      const message = await addToQueueApi(date,filteredTreatm,userSend._id,deatailUserList._id);
      console.log(message); // Handle the success message (e.g., show a success notification to the user)
      checkWaitList(value._id,value.Name,value.Family,selectedTimeOfDay,selectedDate,userSend)
    } catch (error) {
      console.error('Error adding user to the queue:', error); // Handle errors (e.g., show an error message to the user)
    }
    createCalendarEvent(date)

  }
  };
  
  
  
  const tileDisabled = ({ activeStartDate, date, view }) => {
    if (view === 'month' && isDataLoaded) {
      const workingDay = deatailUserList.WorkingDay.map(day => day.Day);
      const workingDayNumbers = workingDay.map(dayName => moment().day(dayName).day());
      const dayOfWeek = date.getDay();
  
      // Check if the selected date is a vacation day
      const isVacationDay = deatailUserList.HoliDay.some(vacationDay => {
        return moment(date).isBetween(moment(vacationDay.StartDate), moment(vacationDay.EndDate), null, '[]');
      });
  
      // Disable the slot if it's not a working day or if it's a vacation day
      return !workingDayNumbers.includes(dayOfWeek) || isVacationDay;
    }
    return false;
  };
  

  const handleDateSelection = (date) => {
    // console.log(date)
    setSelectedDate(date);
    setIsDateSelected(true);
  };
 

  const handleTimeSelection = (time) => {
    console.log(time)
    setSelectedAppointmentTime(time);
  };

  const handleAddToQueueClick = () => {
    console.log("1234567890")
    setButtonClicked(true);
    //sendSmsNotification({"phoneNumber":"+972507815777"},"היי")
  };

  useEffect(() => {
    if (selectedAppointmentTime !== null) {
      addToQueueHandler();
    }
  }, [selectedAppointmentTime,buttonClicked]);

  
  return (
    <div style={{ display: "inline-flex", flexDirection: "column" }}>
    {/* <button onClick={createCalendarEvent}>Sign In</button> */}
    <button className="exit-button" onClick={handleExitClick}>
      X
    </button>
   
    <div className="chat-container">
    {value && <HomeClient  userName={value}   />}
      <div className="chat-header ">
        <h2> צ'אט  <RxExit   onClick={handleBackClick}/> </h2>
        {/* <button className="back-button" onClick={handleBackClick}>
            X
          </button> */}

      </div>
      {renderButtons()}
        {/* {isDateSelected && selectedTimeOfDay !== null && (
          <EarliestAvailableTime selectedDate={selectedDate} deatailUserList={deatailUserList} selectedTimeOfDay = {selectedTimeOfDay} allTreat= {allTreat} filteredTreatm={filteredTreatm} onEarliestTimeChange={setEarliestTime} onTimeSelection={handleTimeSelection}    />
        
          )}
           {isDateSelected && selectedTimeOfDay !== null && (
            <button className="addQueue" onClick={handleAddToQueueClick}>הוסף תור</button>)} */}

    </div>
  </div>

  );
};

export default QuestionButtons;
