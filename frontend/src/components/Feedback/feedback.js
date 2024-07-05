import React, { useState } from 'react';
import './feedback.css';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [funToRead, setFunToRead] = useState(null);

  const handleFeedbackChange = (e) => setFeedback(e.target.value);
  const handleRatingChange = (index) => setRating(index);
  const handleFunToReadChange = (e) => setFunToRead(e.target.value === 'yes');

  const handleSave = () => {
    if (feedback && rating) {
      const newReview = { feedback, rating, funToRead };
      setReviews([...reviews, newReview]);
      setFeedback('');
      setRating(0);
      setFunToRead(null);
    }
  };

  return (
    <div className="feedback-container">
      <div className="feedback-form">
        <h2>Drop a Feedback</h2>
        <textarea value={feedback} onChange={handleFeedbackChange} placeholder="Your feedback..." />
        
        <div className="fun-to-read">
          <p>Was it fun to read?</p>
          <br></br>
          <label>
            <input type="radio" value="yes" checked={funToRead === true} onChange={handleFunToReadChange} /> Yes
          </label>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <label>
            <input type="radio" value="no" checked={funToRead === false} onChange={handleFunToReadChange} /> No
          </label>
        </div>
        
        <div className="rating">
          <p>&nbsp;&nbsp;&nbsp;&nbsp;Give us a rating</p>
          {[1, 2, 3, 4, 5].map((index) => (
            <span key={index} onClick={() => handleRatingChange(index)}>
              {rating >= index ? '★' : '☆'}
            </span>
          ))}
        </div>
        
        <button className="feedback-button" onClick={handleSave}>SAVE</button>
      </div>
      
      <div className="reviews">
        <h2>Previous Users' Feedback</h2>
        {reviews.map((review, index) => (
          <div key={index} className="review">
                      </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;
