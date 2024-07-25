import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './components/Home/HomePage';
import Generate from './components/Generate/generate'; // Ensure this path is correct
import Login from './components/Login/login'; // Import your Login component
import Navbar from './components/Nav/Navbar';
import Signup from './components/sign_up/signup';
import Feedback from './components/Feedback/feedback';
import './App.css';
import ViewBrowser from './components/Generate/ViewBrowser';


function App() {
  const location = useLocation();
  const hideNavbarRoutes = ['/login'];

  return (
    <div className="App">
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/view-browser" element={<ViewBrowser />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </div>
  );
}

export default App;
