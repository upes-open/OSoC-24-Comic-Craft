import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/Home/HomePage';
import Generate from './components/Generate/generate'; // Ensure this path is correct
import Navbar from './components/Nav/Navbar';
import CreateAccountForm from './components/sign_up/CreateAccountForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/CreateAccountForm" element={<CreateAccountForm/>} />
        </Routes>
    </div>
  );
}

export default App;