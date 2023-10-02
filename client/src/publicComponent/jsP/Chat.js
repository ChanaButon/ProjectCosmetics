import React, { useState } from "react";
import './style.css'
import { googleSignIn } from './googleCalendar/googleCalnedar';
import DateTimePicker from 'react-datetime-picker';
import axios from 'axios';
// import './h.css';
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';

function QuestionButtons() {
  // State to store the selected question
  const [selectedQuestion, setSelectedQuestion] = useState(null);
const [activeButton, setActiveButton] = useState(null);

const [start, setStart] = useState(new Date);
const [end, setEnd] = useState(new Date);
const [eventName, setEventName] = useState("");
const [eventDescription, setEventDescription] = useState("");

const session = useSession();
const supabase = useSupabaseClient();
const { isLoading } = useSessionContext();
  // Function to handle button click
  const handleButtonClick = (question) => {
    setSelectedQuestion(question);
  };

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
      <DateTimePicker  size={200}/>
      <div className="chat-container">
        <div className="chat-header ">
          <h2>CHAT</h2>
        </div>


        <div className="chat-body">
          <h3>Select a time:</h3>
          <button  className="message-bubble other" onClick={() => handleButtonClick("morning")}>Morning</button>
          <button className="message-bubble other" onClick={() => handleButtonClick("noon")}>Noon</button>
          <button className="message-bubble other" onClick={() => handleButtonClick("evening")}>Evening</button>
        </div >
        {renderButtons()}
      </div>
    </div>


    // <div style={{ display: "inline-flex", flexDirection: "column" }}>
    // <div className="chat-container">
    // <div className="chat-header">
    // <h2>CHAT</h2>
    // </div>
    // <div className="chat-body">
    // {

    // }
    // <div className="message-bubble me">
    // <p>Hi, I'm good. Thanks for asking!</p>
    // </div>
    // {/* <div class="message-bubble other">
    // <p>That's great to hear! I was wondering if you had time to chat about the project we're working on?</p>
    // </div> */}
    // <div className="message-bubble me">
    // <p>Sure, let's chat about it now.</p>
    // </div>
    // </div>
    // <div className="chat-input">
    // {/* <input type="text" placeholder="Type your message here"> */}
    // {/* <button>Send</button> */}
    // </div>
    // </div>







  );
}

export default QuestionButtons;