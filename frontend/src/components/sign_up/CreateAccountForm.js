import React, { useState } from 'react';
import './CreateAccountForm.css';

const CreateAccountForm = () => {
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First Name is required';
    if (!formData.lastName) newErrors.lastName = 'Last Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.username) newErrors.username = 'Username is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Handle form submission
      console.log(formData);
      // Reset form
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
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="profilePicture">Profile Picture (optional)</label>
            <ProfilePictureUpload
              onChange={handleChange}
              profilePicture={formData.profilePicture}
            />
          </div>

          <button type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <a href="#login">Login</a></p>
        <p><span>-----------------OR---------------</span></p>
        <div className="google-signup">
          <button>Sign up with Google</button>
        </div>
      </div>
    </Background>
  );
};

const ProfilePictureUpload = ({ onChange }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
      onChange(e);
    }
  };

  return (
    <div className="profile-picture-upload">
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {imagePreview && <img src={imagePreview} alt="Profile Preview" />}
    </div>
  );
};

const Background = ({ children }) => {
  return <div className="signup-background">{children}</div>;
};

export default CreateAccountForm;
