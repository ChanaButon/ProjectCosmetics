import React, { useState } from 'react';

function Try() {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  return (
    <div>
      <Button
        id="button1"
        isActive={activeButton === 'button1'}
        onClick={handleButtonClick}
      />
      <Button
        id="button2"
        isActive={activeButton === 'button2'}
        onClick={handleButtonClick}
      />
    </div>
  );
}

function Button({ id, isActive, onClick }) {
  const handleClick = () => {
    onClick(id);
  };

  const buttonStyle = {
    backgroundColor: isActive ? 'red' : 'blue',
    // Add any other desired styles here
  };

  return (
    <button
      style={buttonStyle}
      onClick={handleClick}
    >
      Button {id}
    </button>
  );
}

export default Try;
