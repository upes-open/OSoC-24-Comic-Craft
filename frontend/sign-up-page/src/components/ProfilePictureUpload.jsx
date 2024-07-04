// src/components/ProfilePictureUpload.jsx
import React, { useState } from 'react';
import './ProfilePictureUpload.css';

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

export default ProfilePictureUpload;
