import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import GoogleLogo from '../../assets/login-google.png'; // Ensure this path is correct
import WhiteLine from '../../assets/orline.png'; // Ensure this path is correct
import './signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
    username: '',
    profilePicture: null,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const response = await fetch('http://localhost:4000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Failed to submit form');
        }

        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          gender: '',
          username: '',
          profilePicture: null,
        });
        setErrors({});
        alert('Signup successful!');
        navigate('/login');
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Failed to sign up. Please try again later.');
      }
    }
  };

  return (
    <Background>
      <div className="create-account-form">
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <p className="error">{errors.firstName}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <p className="error">{errors.lastName}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p className="error">{errors.gender}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>

          <button type="submit">SIGN UP</button>
        </form>
        <p>Already have an account? <a href="/login" className='signup-login'>Login</a></p>
        
        <div className="signup-extra">
          {/* OR line */}
          <div className="signup-or-container">
            <img src={WhiteLine} alt="White Line" className="white-line-sign-left" />
            <p className="signup-or">OR</p>
            <img src={WhiteLine} alt="White Line" className="white-line-sign-right" />
          </div>

          {/* Google sign-up button */}
          <div className="google-signup">
            <button className="google-signup-button">
              Sign up with
              {/* <img src={GoogleLogo} alt="Google" className="google-logo" /> */}
            </button>
          </div>
        </div>
      </div>
    </Background>
  );
};

const Background = ({ children }) => {
  return <div className="signup-background">{children}</div>;
};

export default Signup;
