import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./ViewBrowser.css";

const ViewBrowser = () => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const response = await axios.get('http://localhost:4000/list-images');
        setImageUrls(response.data);
      } catch (error) {
        console.error('Error fetching image URLs:', error);
      }
    };

    fetchImageUrls();
  }, []);

  return (
    <div className="view-browser">
      <h1 className="view-h1">PHOTO GALLERY</h1>
      <div className="image-grid">
        {imageUrls.map((imageUrl, index) => (
          <div key={index} className="image-item">
            <img src={`http://localhost:4000/images/${imageUrl}`} alt={`Image ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewBrowser;