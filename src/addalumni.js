import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addAlumni } from './api';  // Import the addAlumni function
import './editalumni.css'; 

const AddAlumni = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    birth_date: '',
    batch_year: '',
    contact_number: '', 
    address: '',
  });

  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addAlumni(formData);  // Call the addAlumni function from api.js
      alert('Alumni added successfully!');
      navigate('/adminpage');  // Navigate back to the admin dashboard
    } catch (error) {
      alert('Failed to add alumni');
    }
  };

  return (
    <div className="edit-alumni-container">
      <h1>Add Alumni Information</h1>
      <form className="edit-alumni-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name:</label>
          <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Middle Name:</label>
          <input type="text" name="middle_name" value={formData.middle_name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Birth Date:</label>
          <input type="date" name="birth_date" value={formData.birth_date} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Batch Year:</label>
          <input type="number" name="batch_year" value={formData.batch_year} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Contact Number:</label>
          <input type="text" name="contact_number" value={formData.contact_number} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <textarea name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <button type="submit" className="submit-button">Add Alumni</button>
      </form>
    </div>
  );
};

export default AddAlumni;
