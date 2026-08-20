import React, { useState } from 'react';
import './FinalRating.css';
import starIcon from '../../Images/Final/Star.png';
import FinalButton from './FinalButton';

function FinalRating() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const handleStarHover = (index) => {
    setHoveredRating(index + 1);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  const displayRating = hoveredRating || rating;

  return (
    <div className="final-rating">
      <div className="final-rating-wrapper">
        <span className="final-rating__label">Оценить сервис</span>
        <div className="final-rating__stars">
          {[0, 1, 2, 3, 4].map((index) => (
            <img
              key={index}
              src={starIcon}
              alt="Star"
              className={`final-rating__star ${index < displayRating ? 'final-rating__star--active' : ''}`}
              onClick={() => handleStarClick(index)}
              onMouseEnter={() => handleStarHover(index)}
              onMouseLeave={handleStarLeave}
            />
          ))}
        </div>
      </div>
      <FinalButton to="/" />
    </div>
  );
}

export default FinalRating;