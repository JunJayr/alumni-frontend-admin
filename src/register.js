import React, { useState } from 'react';
import { registerUser } from './api';
import './styles.css';

// Modal Component for Confirmation
const Modal = ({ formData, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Confirm Your Information</h3>
        <ul className="modal-list">
          <li><strong>First Name:</strong> {formData.first_name}</li>
          <li><strong>Middle Name:</strong> {formData.middle_name}</li>
          <li><strong>Last Name:</strong> {formData.last_name}</li>
          <li><strong>Birth Date:</strong> {formData.birth_date}</li>
          <li><strong>Batch Year:</strong> {formData.batch_year}</li>
          <li><strong>Contact Number:</strong> {formData.contact_number}</li>
          <li><strong>Address:</strong> {formData.address}</li>
        </ul>
        <div className="modal-actions">
          <button className="modal-btn" onClick={onConfirm}>Confirm</button>
          <button className="modal-btn cancel" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    birth_date: '',
    batch_year: '',
    contact_number: '',
    address: '',
  });

  const [isModalVisible, setModalVisible] = useState(false);  // Track modal visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModalVisible(true);  // Show the modal to confirm
  };

  const handleModalConfirm = async () => {
    try {
      await registerUser(formData);  // Proceed with the registration
      alert('Registration successful!');
    } catch (error) {
      alert('Registration failed');
    }
    setModalVisible(false);  // Close the modal after confirming
  };

  const handleModalCancel = () => {
    setModalVisible(false);  // Close the modal without doing anything
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="register-page">
      <form onSubmit={handleSubmit} className="register-form">
        <h1>LES Alumni Online Registration</h1>
        <div className="input-group">
          <label>First Name:</label>
          <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label>Middle Name:</label>
          <input type="text" name="middle_name" value={formData.middle_name} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label>Last Name:</label>
          <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label>Birth Date:</label>
          <input type="date" name="birth_date" value={formData.birth_date} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label>Batch Year:</label>
          <input type="number" name="batch_year" value={formData.batch_year} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label>Contact Number:</label>
          <input type="text" name="contact_number" value={formData.contact_number} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label>Address:</label>
          <textarea name="address" value={formData.address} onChange={handleChange} />
        </div>
        <button type="submit" className="register-btn">Register</button>
      </form>

      {/* Render the modal if visible */}
      {isModalVisible && (
        <Modal 
          formData={formData}
          onConfirm={handleModalConfirm}
          onCancel={handleModalCancel}
        />
      )}
    </div>
  );
};

export default Register;
