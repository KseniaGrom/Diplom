import React from 'react';
import './SearchButton.css';

function SearchButton({ 
  departureDate, 
  returnDate,
  onSearchStart 
}) {
  const handleClick = () => {
    if (onSearchStart) {
      onSearchStart({
        departureDate: departureDate ? departureDate.toISOString() : null,
        returnDate: returnDate ? returnDate.toISOString() : null,
      });
    }
  };

  return (
    <button className="search-button" onClick={handleClick}>
      НАЙТИ БИЛЕТЫ
    </button>
  );
}

export default SearchButton;