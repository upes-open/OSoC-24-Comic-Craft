import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Ensure this CSS file is created for styling
import Profilenavbar from '../../assets/Profilenavbar.png'; // Adjust path based on actual structure
import logonavbar from '../../assets/logonavbar.png';

const Navbar = () => {
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('username') !== null;

  // Retrieve the username from local storage
  const username = localStorage.getItem('username');

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logonavbar} alt="logo" className="navbar-logo-img" />
        <span>{isLoggedIn ? username : 'Guest'}</span> {/* Display username or 'Guest' */}
      </div>
      <div className="navbar-items">
        {isLoggedIn ? (
          <>
            <Link to="/logout">LOGOUT</Link>
            <Link to="/generate">GENERATE</Link>
            <Link to="/my-comics">MY COMICS</Link>
            <Link to="/feedback">FEEDBACK</Link>
          </>
        ) : (
          <>
            <Link to="/signup">SIGNUP</Link>
            <Link to="/generate">GENERATE</Link>
            <Link to="/my-comics">MY COMICS</Link>
            <Link to="/feedback">FEEDBACK</Link>
          </>
        )}
        <img src={Profilenavbar} alt="icon" className="navbar-icon" />
      </div>
    </nav>
  );
};

export default Navbar;
