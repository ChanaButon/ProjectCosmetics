import React, { useState } from 'react';
import Modal from 'react-modal';

const AddTreatmentModal = ({ isOpen, onClose, onAddTreatment }) => {
  const [selectedTreatment, setSelectedTreatment] = useState('');
  const [price, setPrice] = useState(''); // New state for price
  const [treatmentTime, setTreatmentTime] = useState(''); // New state for treatment time
  const [treatmantList, setTreatmantList] = useState([
    "גבות/שפם",
    "מניקור",
    "פדיקור",
    "טיפול פנים",
    "הלחמת ריסים"
  ]);

  const handleAddClick = () => {
    // Validate and add the treatment
    if (selectedTreatment.trim() !== '' && price.trim() !== '' && treatmentTime.trim() !== '') {
      const newTreatment = {
        TreatmantName: selectedTreatment,
        Price: price,
        TreatmantTime: treatmentTime
      };
  
      // Pass the new treatment to the parent component
      onAddTreatment(newTreatment);
      onClose();
    }
  };
  

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Add Treatment">
      <h2>הוספת טיפול חדש</h2>
      <label>:בחירת טיפול</label>
      <select
        value={selectedTreatment}
        onChange={(e) => setSelectedTreatment(e.target.value)}
      >
        <option value="" disabled>בחירת טיפול</option>
        {treatmantList.map((treatment) => (
          <option key={treatment} value={treatment}>
            {treatment}
          </option>
        ))}
      </select>
      <label>מחיר</label>
      <input
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <label>זמן טיפול בדקות</label>
      <input
        type="text"
        value={treatmentTime}
        onChange={(e) => setTreatmentTime(e.target.value)}
      />
      <button onClick={handleAddClick}>הוסף</button>
      <button onClick={onClose}>ביטול</button>
    </Modal>
  );
};

export default AddTreatmentModal;
