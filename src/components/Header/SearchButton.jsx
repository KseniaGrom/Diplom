import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchButton.css';

function SearchButton({ departureDate, returnDate }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/tickets', {
      state: {
        departureDate: departureDate ? departureDate.toISOString() : null,
        returnDate: returnDate ? returnDate.toISOString() : null,
      }
    });
  };

  return (
    <button className="search-button" onClick={handleClick}>
      НАЙТИ БИЛЕТЫ
    </button>
  );
}

export default SearchButton;