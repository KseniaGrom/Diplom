import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchButton.css';

function SearchButton({ 
  departureDate, 
  returnDate,
  fromCity,
  toCity,
  fromCityId,
  toCityId,
  onSearchStart 
}) {
  const navigate = useNavigate();

  const formatDate = (date) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleClick = () => {

    const params = new URLSearchParams();
    if (fromCityId) params.append('from_city_id', fromCityId);
    if (toCityId) params.append('to_city_id', toCityId);
    if (departureDate) {
      params.append('date_start', formatDate(departureDate));
    }
    if (returnDate) {
      params.append('date_end', formatDate(returnDate));
    }

    params.append('sort', 'date');
    params.append('limit', '5');
    params.append('offset', '0');

    if (onSearchStart) {
      onSearchStart({
        departureDate: departureDate ? formatDate(departureDate) : null,
        returnDate: returnDate ? formatDate(returnDate) : null,
        fromCity: fromCity,
        toCity: toCity,
        fromCityId: fromCityId,
        toCityId: toCityId,
        params: params.toString()
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