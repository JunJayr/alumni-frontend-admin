import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAlumni, deleteAlumni } from './api';  // Import functions from api.js
import './styles.css';

const AdminPage = () => {
  const [alumniList, setAlumniList] = useState([]);
  const navigate = useNavigate();

  // Fetch alumni records
  const getAlumniList = async () => {
    try {
      const alumniData = await fetchAlumni();
      setAlumniList(alumniData);
    } catch (error) {
      console.error('Error fetching alumni:', error);
    }
  };

  // Handle deleting an alumni record
  const handleDelete = async (id) => {
    try {
      const status = await deleteAlumni(id);  // Call the delete function from api.js
      if (status === 204) {
        alert('Alumni record deleted successfully');
        getAlumniList();  // Refresh the alumni list after deletion
      }
    } catch (error) {
      alert('Failed to delete alumni record');
    }
  };

  // Handle editing an alumni record
  const handleEdit = (id) => {
    navigate(`/editalumni/${id}`);  // Navigate to the edit page
  };

  // Fetch the alumni list when the component mounts
  useEffect(() => {
    getAlumniList();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard - Alumni Management</h1>
      <button onClick={() => navigate('/addalumni/')}>Add New Alumni</button>

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Batch Year</th>
            <th>Contact Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {alumniList.map((alumnus) => (
            <tr key={alumnus.id}>
              <td>{alumnus.first_name}</td>
              <td>{alumnus.last_name}</td>
              <td>{alumnus.batch_year}</td>
              <td>{alumnus.contact_number}</td>
              <td>
                <button onClick={() => handleEdit(alumnus.id)}>Edit</button>
                <button onClick={() => handleDelete(alumnus.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
