// src/components/Navbar.jsx
import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">LOGO</div>
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      <div className="navbar-links">
        <a href="#signup" className="signup">SIGNUP</a>
        <a href="#generate">GENERATE</a>
        <a href="#comics">MY COMICS</a>
        <a href="#feedback">FEEDBACK</a>
      </div>
      <div className="navbar-user-icon">
        <img src={require('./Profile.png')} alt="User Icon" />
      </div>
    </nav>
  );
};

export default Navbar;
