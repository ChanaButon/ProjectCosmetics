import React, { useState } from 'react';
import Modal from 'react-modal';

const AddTreatmentModal = ({ isOpen, onClose, onAddTreatment }) => {
  const [newTreatment, setNewTreatment] = useState('');

  const handleAddClick = () => {
    // Validate and add the treatment
    if (newTreatment.trim() !== '') {
      onAddTreatment(newTreatment);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Add Treatment">
      <h2>Add New Treatment</h2>
      <label>Treatment Name:</label>
      <input
        type="text"
        value={newTreatment}
        onChange={(e) => setNewTreatment(e.target.value)}
      />
      <button onClick={handleAddClick}>Add</button>
      <button onClick={onClose}>Cancel</button>
    </Modal>
  );
};

export default AddTreatmentModal;
