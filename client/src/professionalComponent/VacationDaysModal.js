import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';


const VacationDaysModal = ({
  isOpen,
  onClose,
  value,
  onVacationDaysChange,
}) => {
  const [newVacationDay, setNewVacationDay] = useState({ StartDate: '', EndDate: '' });
  const [editedVacationDay, setEditedVacationDay] = useState({});
  const [selectedVacationDayIndex, setSelectedVacationDayIndex] = useState(null);

  const handleAddVacationDay = () => {
    onVacationDaysChange([...(value || []), newVacationDay]);
    setNewVacationDay({ StartDate: '', EndDate: '' });
  };

  const handleUpdateVacationDay = (index) => {
    setEditedVacationDay({ ...value[index] });
    setSelectedVacationDayIndex(index);
  };

  const handleDeleteVacationDay = () => {
    const updatedVacationDays = [...(value || [])];
    updatedVacationDays.splice(selectedVacationDayIndex, 1);
    onVacationDaysChange(updatedVacationDays);
    setSelectedVacationDayIndex(null);
    setEditedVacationDay({});
  };

  const handleUpdateSave = () => {
    const updatedVacationDays = [...(value || [])];
    updatedVacationDays[selectedVacationDayIndex] = editedVacationDay;
    onVacationDaysChange(updatedVacationDays);
    setSelectedVacationDayIndex(null);
    setEditedVacationDay({});
  };
  

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Vacation Days"
    >
      <div>
        <h2>ימי חופשה</h2>
        <div>
        {(value || []).map((vacationDay, index) => (
    <div key={index}>
      {`Start Date: ${vacationDay.StartDate}, End Date: ${vacationDay.EndDate}`}
      <button onClick={() => handleUpdateVacationDay(index)}>עריכה</button>
      <button onClick={() => handleDeleteVacationDay(index)}>מחיקה</button>
    </div>
  ))}
        </div>
        <div>
          <label>תחילת חופשה:</label>
          <input
            type="date"
            value={newVacationDay.StartDate}
            onChange={(e) => setNewVacationDay({ ...newVacationDay, StartDate: e.target.value })}
          />
          <label>סוף חופשה:</label>
          <input
            type="date"
            value={newVacationDay.EndDate}
            onChange={(e) => setNewVacationDay({ ...newVacationDay, EndDate: e.target.value })}
          />
          <button onClick={handleAddVacationDay}>הוספת ימי חופשה</button>
        </div>
        {selectedVacationDayIndex !== null && (
          <div>
            <label>תחילת חופשה:</label>
            <input
              type="date"
              value={editedVacationDay.StartDate || ''}
              onChange={(e) => setEditedVacationDay({ ...editedVacationDay, StartDate: e.target.value })}
            />
            <label>סוף חופשה:</label>
            <input
              type="date"
              value={editedVacationDay.EndDate || ''}
              onChange={(e) => setEditedVacationDay({ ...editedVacationDay, EndDate: e.target.value })}
            />
            <button onClick={handleUpdateSave}>שמירת שינוים</button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default VacationDaysModal;
