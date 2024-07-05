import React, { useState } from 'react';
import Superman from '../../assets/Superman.png'; 
import Batman from '../../assets/login-batman.png'; 
import GoogleLogo from '../../assets/login-google.png';
import WhiteLine from '../../assets/orline.png'; // Add the white line image here
import './login.css'; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      // Proceed with login logic here
      console.log('Validated successfully');
    } else {
      console.log('Validation failed');
    }
  };

  return (
    <div className="login-container">
      <img src={Superman} alt="superman" className="login-image top-left" />
      <img src={Batman} alt="Bottom Right" className="login-image bottom-right" />
      <h1 className="login-heading">Log into your account!</h1>
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="login-username">Username</label> 
          <input
            type="text"
            placeholder="Username"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <p className="error-message">{errors.username}</p>}
          
          <label htmlFor="login-password">Password</label> 
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
          
          <button type="submit" className="login-button">LOGIN</button>
        </form>
        <div className="login-extra">
          <p className="signup-text">Don't have an account? <a href="/signup" className="signup-link">Sign up</a></p>
          <div className="login-or-container">
            <img src={WhiteLine} alt="White Line" className="white-line" />
            <p className="login-or">OR</p>
            <img src={WhiteLine} alt="White Line" className="white-line" />
          </div>
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
