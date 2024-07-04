import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/Home/HomePage';
import Generate from './components/Generate/generate'; // Ensure this path is correct
import Login from './components/Login/login'; // Import your Login component
import Navbar from './components/Nav/Navbar';
import './App.css';

function App() {


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;