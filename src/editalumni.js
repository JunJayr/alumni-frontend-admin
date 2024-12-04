import React, { useState, useEffect, useCallback } from 'react';  // Import useCallback
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAlumni, editAlumni } from './api';  // Import the fetchAlumni and editAlumni functions
import './editalumni.css';  // Import the CSS for styling

const EditAlumni = () => {
  const { id } = useParams();  // Get the alumni ID from the URL params
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

  // Memoize the getAlumniDetails function
  const getAlumniDetails = useCallback(async () => {
    try {
      const alumniData = await fetchAlumni();  // Fetch all alumni data
      const selectedAlumni = alumniData.find((alumni) => alumni.id === parseInt(id));
      if (selectedAlumni) {
        setFormData(selectedAlumni);  // Set the form data with the alumni details
      } else {
        alert('Alumni not found!');
        navigate('/admin');
      }
    } catch (error) {
      console.error('Error fetching alumni details:', error);
      alert('Failed to load alumni details');
    }
  }, [id, navigate]);  // Memoize based on id and navigate

  // Fetch the alumni details when the component mounts
  useEffect(() => {
    getAlumniDetails();
  }, [getAlumniDetails]);  // Only call getAlumniDetails when it changes

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
      await editAlumni(id, formData);
      alert('Alumni updated successfully!');
      navigate('/adminpage');  // Navigate back to the admin dashboard
    } catch (error) {
      alert('Failed to update alumni');
    }
  };

  return (
    <div className="edit-alumni-container">
      <h1>Edit Alumni Information</h1>
      <form className="edit-alumni-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Middle Name:</label>
          <input
            type="text"
            name="middle_name"
            value={formData.middle_name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Birth Date:</label>
          <input
            type="date"
            name="birth_date"
            value={formData.birth_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Batch Year:</label>
          <input
            type="number"
            name="batch_year"
            value={formData.batch_year}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Contact Number:</label>
          <input
            type="text"
            name="contact_number"
            value={formData.contact_number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="submit-button">Update Alumni</button>
        </div>
      </form>
    </div>
  );
};

export default EditAlumni;
