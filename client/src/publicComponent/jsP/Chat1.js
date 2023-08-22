import { useState } from "react";
import './style.css'
function App() {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (buttonIndex) => {
    setSelectedButton(buttonIndex);

  };

  const buttonList = [
    {
      label: " Button 1 ",
      options: ["Option 1", "Option 2", "Option 3"]

    },
    {
      label: "Button 2",
      options: ["Option A", "Option B", "Option C"]
    },
    {
      label: "Button 3",
      options: ["Option X", "Option Y", "Option Z"]
    }
  ];

  const selectedButtonOptions =
    selectedButton !== null ? buttonList[selectedButton].options : [];

  return (
    <div style={{ display: "inline-flex", flexDirection: "column" }}>
      <div className="chat-container">
        <div className="chat-header">
          <h2>CHAT</h2>
        </div>
        <div className="chat-body">
          {

          }
          <div className="message-bubble me">
            <p>Hi, I'm good. Thanks for asking!</p>
          </div>
          {/* <div class="message-bubble other">
         <p>That's great to hear! I was wondering if you had time to chat about the project we're working on?</p>
           </div> */}
          <div className="message-bubble me">
            <p>Sure, let's chat about it now.</p>
          </div>
        </div>
       
      </div>

      {buttonList.map((button, index) => (
        <button
          key={index}
          onClick={() => handleButtonClick(index)}
        //   disabled={selectedButton !== null && index !== selectedButton}
        >
          {button.label}
        </button>
      ))}
      {selectedButton !== null &&
        selectedButtonOptions.map((option, index) => (
          <button key={index}>{option}</button>
        ))}

    </div>
  );
}

export default App;