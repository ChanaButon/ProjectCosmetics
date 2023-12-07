import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Modal from 'react-modal';

const VacationDaysPage = ({ onSave, onCancel, onUpdate, onDelete, selectedDay }) => {
  const [showModal, setShowModal] = useState(true);
  const [selectedDays, setSelectedDays] = useState([]);

  const handleSaveVacationDays = () => {
    onSave(selectedDays);
    setShowModal(false);
  };

  const handleCancelVacationDays = () => {
    setShowModal(false);
    onCancel();
  };

  const handleUpdateVacationDays = (date) => {
    onUpdate(date);
    setShowModal(false);
  };

  const handleDeleteVacationDays = () => {
    onDelete(selectedDay);
    setShowModal(false);
  };

  return (
    <Modal isOpen={showModal} onRequestClose={handleCancelVacationDays}>
      <div>
        <h2>{selectedDay ? 'Edit Vacation Day' : 'Select Vacation Days'}</h2>
        <Calendar onChange={(date) => setSelectedDays(date)} value={selectedDays} selectRange />

        {selectedDay && (
          <div>
            <p>Selected Day: {selectedDay.toDateString()}</p>
            <button onClick={() => handleUpdateVacationDays(selectedDay)}>Update</button>
            <button onClick={handleDeleteVacationDays}>Delete</button>
          </div>
        )}

        <div>
          <button onClick={handleSaveVacationDays}>Save Vacation Days</button>
          <button onClick={handleCancelVacationDays}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default VacationDaysPage;
