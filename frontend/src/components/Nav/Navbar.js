// src/components/Nav/Navbar.js

import React from 'react';
import './Navbar.css'; // Make sure to create this CSS file for styling
import Profilenavbar from '../../assets/Profilenavbar.png';  // Adjust path based on actual structure

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">logo</div>
      <div className="navbar-items">
        <a href="/CreateAccountForm">SIGNUP</a>
        <a href="/generate">GENERATE</a>
        <a href="/my-comics">MY COMICS</a>
        <a href="/feedback">FEEDBACK</a>
        <img src={Profilenavbar} alt="icon" className="navbar-icon" />
      </div>
    </nav>
  );
};

export default Navbar;
