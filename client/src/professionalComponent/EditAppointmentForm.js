import React, { useState, useEffect } from 'react';

const EditAppointmentForm = ({ appointment, onSave, onCancel }) => {
  const [editedAppointment, setEditedAppointment] = useState(appointment);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedAppointment({ ...editedAppointment, [name]: value });
  };

  const handleSave = () => {
    onSave(editedAppointment);
  };

  return (
    <div>
      <h2>Edit Appointment</h2>
      <label>Title:</label>
      <input type="text" name="Title" value={editedAppointment.Title} onChange={handleInputChange} /><br />
      <label>Description:</label>
      <input type="text" name="Description" value={editedAppointment.Description} onChange={handleInputChange} /><br />
      {/* Add more fields for editing */}
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EditAppointmentForm;
