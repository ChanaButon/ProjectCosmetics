import React, { useState } from 'react';

const ChatWindow = ({ user, messages, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    onSendMessage(user, newMessage);
    setNewMessage('');
  };

  return (
    <div>
      <h2>{user}</h2>
      {messages.map((message, i) => (
        <p key={i}>{message}</p>
      ))}
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatWindow;
