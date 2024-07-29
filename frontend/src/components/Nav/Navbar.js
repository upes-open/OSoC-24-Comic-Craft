import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Make sure to create this CSS file for styling
import Profilenavbar from '../../assets/Profilenavbar.png'; // Adjust path based on actual structure

const Navbar = () => {
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('username') !== null;

  return (
    <nav className="navbar">
      <div className="navbar-logo">logo</div>
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
