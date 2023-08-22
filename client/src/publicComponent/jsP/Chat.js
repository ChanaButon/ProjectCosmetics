import React, { useState } from "react";
import './style.css'


function QuestionButtons() {
  // State to store the selected question
  const [selectedQuestion, setSelectedQuestion] = useState(null);
const [activeButton, setActiveButton] = useState(null);
  // Function to handle button click
  const handleButtonClick = (question) => {
    setSelectedQuestion(question);
  };

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