import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const EditForm = () => {
    const location = useLocation();

    const { value } = location.state || {};

  const [formData, setFormData] = useState(value);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" name="Name" value={formData.Name} onChange={handleChange} required />
      </div>
      <div>
        <label>Family:</label>
        <input type="text" name="Family" value={formData.Family} onChange={handleChange} required />
      </div>
      <div>
        <label>Address:</label>
        <input type="text" name="Address" value={formData.Address} onChange={handleChange} required />
      </div>
      <div>
        <label>Describe:</label>
        <input type="text" name="Describe" value={formData.Describe} onChange={handleChange} required />
      </div>
      {/* Add more fields as needed */}
      <button type="submit">Save</button>
    </form>
  );
};

export default EditForm;
