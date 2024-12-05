import axios from 'axios';

const API_URL = 'https://alumni-backend-production.up.railway.app/api/';

// Register a new user (alumni)
export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${API_URL}alumni/`, data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Registration failed:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
    throw error;
  }
};

// Fetch all alumni
export const fetchAlumni = async () => {
  try {
    const response = await axios.get(`${API_URL}alumni/`);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error fetching alumni:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
    throw error;
  }
};

// Delete an alumni by ID
export const deleteAlumni = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}alumni/${id}/`);
    return response.status;  // Return the status code to handle success
  } catch (error) {
    if (error.response) {
      console.error('Error deleting alumni:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
    throw error;
  }
};

// Add a new alumni (equivalent to registerUser but more specific to the Add process)
export const addAlumni = async (data) => {
  try {
    const response = await axios.post(`${API_URL}alumni/`, data);
    return response.data;  // Returning the added alumni record
  } catch (error) {
    if (error.response) {
      console.error('Error adding alumni:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
    throw error;
  }
};

// Edit an alumni (Update an existing alumni record by ID)
export const editAlumni = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}alumni/${id}/`, data);
    return response.data;  // Returning the updated alumni record
  } catch (error) {
    if (error.response) {
      console.error('Error editing alumni:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
    throw error;
  }
};
