import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchButton.css';

function SearchButton({ 
  departureDate, 
  returnDate,
  onSearchStart 
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onSearchStart) {
      onSearchStart();
    }
//Поставила временно, чтобы проверить работу анимации
    setTimeout(() => {
      navigate('/tickets', {
        state: {
          departureDate: departureDate ? departureDate.toISOString() : null,
          returnDate: returnDate ? returnDate.toISOString() : null,
        }
      });
    }, 2000);
  };

  return (
    <button className="search-button" onClick={handleClick}>
      НАЙТИ БИЛЕТЫ
    </button>
  );
}

export default SearchButton;