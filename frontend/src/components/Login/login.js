import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Superman from '../../assets/Superman.png';
import Batman from '../../assets/login-batman.png';
import GoogleLogo from '../../assets/login-google.png';
import WhiteLine from '../../assets/orline.png';
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate

  // Validate form fields
  const validate = () => {
    let errors = {};
    let isValid = true;

    if (!username.trim()) {
      errors.username = 'Username is required';
      isValid = false;
    }

    if (!password.trim()) {
      errors.password = 'Password is required';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validate()) {
      return; // Exit early if validation fails
    }
  
    const formData = {
      username,
      password
    };
  
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include' // Include credentials if necessary (e.g., cookies)
      });
  
      if (response.ok) {
        alert('Login successful!');
  
        // Store username in local storage
        localStorage.setItem('username', username);
  
        // Redirect to /generate on successful login
        navigate('/generate');
      } else {
        const data = await response.json();
        console.error('Login failed:', data.error); // More detailed error logging
        setErrors({ general: data.error }); // Set general error message
        alert(`Login failed: ${data.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrors({ general: 'Something went wrong. Please try again.' }); // Set general error on catch
      alert('Something went wrong. Please try again.');
    }
  };
  
  return (
    <div className="login-container">
      {/* Display images */}
      <img src={Superman} alt="Superman" className="login-image top-left" />
      <img src={Batman} alt="Batman" className="login-image bottom-right" />

      {/* Display heading */}
      <h1 className="login-heading">Log into your account!</h1>

      <div className="login-form-container">
        {/* Login form */}
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="login-username" className='login-username'>Username</label>
          <input
            type="text"
            id="login-username"
            placeholder="Username"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <p className="error-message">{errors.username}</p>}

          <label htmlFor="login-password" className='login-pass'>Password</label>
          <input
            type="password"
            id="login-password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}

          <button type="submit" className="login-button">LOGIN</button>
        </form>

        {/* Extra login options */}
        <div className="login-extra">
          <p className="signup-text">Don't have an account? <a href="/signup" className="signup-link">Sign up</a></p>

          {/* OR line */}
          <div className="login-or-container">
            <img src={WhiteLine} alt="White Line" className="white-line" />
            <p className="login-or">OR</p>
            <img src={WhiteLine} alt="White Line" className="white-line" />
          </div>

          {/* Google login button */}
          <button className="google-login-button">
            Login with
            <img src={GoogleLogo} alt="Google" className="google-logo" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
