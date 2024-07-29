import React, { useEffect, useState } from 'react'; // Import useEffect and useState
import { useNavigate } from 'react-router-dom';
import './logout.css'; // Import the CSS file for styling

function Logout() {
  const [isProcessing, setIsProcessing] = useState(true); // To control visibility of the processing message
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Function to handle logout
    const handleLogout = () => {
      // Show confirmation dialog
      const isConfirmed = window.confirm('Are you sure you want to log out?');

      if (isConfirmed) {
        // Clear local storage
        localStorage.removeItem('username');
        // Redirect to home page
        navigate('/');
      } else {
        // Redirect to the current location to clear the processing message
        setIsProcessing(false); // Stop processing message
        // Optionally, navigate to the current page or do nothing
        navigate(-1); // Go back to the previous page
      }
    };

    handleLogout();
  }, [navigate]);

  return (
    <div className="logout-container">
      {isProcessing && (
        <div className="logout-alert">Processing your logout request...</div>
      )}
    </div>
  );
}

export default Logout;
