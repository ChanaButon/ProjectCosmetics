import Modal from 'react-modal';
import React from 'react';
import './Home.css'
const EventDetailModal = ({ isOpen, event, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="פרטי התור"
    >
      <h2>פרטי התור</h2>
      {event && (
        <div>
          <p>{event.title}</p>
          <p>{event.startStr.split('T')[1].split("+")[0]}</p>
          {event.extendedProps && (
            <p>{event.extendedProps.phone}</p>
            // Add more details here as needed
          )}
        </div>
      )}
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default EventDetailModal;
