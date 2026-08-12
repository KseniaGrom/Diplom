import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchButton.css';

function SearchButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/tickets');
  };

  return (
    <button className="search-button" onClick={handleClick}>
      НАЙТИ БИЛЕТЫ
    </button>
  );
}

export default SearchButton;