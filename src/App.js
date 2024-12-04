import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';  // Import Navigate for redirecting
import Register from './register';
import AdminPage from './adminpage';
import AddAlumni from './addalumni';
import EditAlumni from './editalumni';
import './styles.css';  // Import the CSS file

const App = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Define Routes for different pages */}
        <Routes>
          {/* Redirect the user to AdminPage by default */}
          <Route path="/" element={<Navigate to="/adminpage" />} />
          
          {/* Define Routes for the different pages */}
          <Route path="/register" element={<Register />} />
          <Route path="/adminpage" element={<AdminPage />} />
          <Route path="/addalumni" element={<AddAlumni />} />
          <Route path="/editalumni/:id" element={<EditAlumni />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
