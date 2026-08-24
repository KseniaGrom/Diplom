import React, { useState } from 'react';
import DirectionGroup from './DirectionGroup';
import DateGroup from './DateGroup';
import SearchButton from './SearchButton';
import './SearchForm.css';

function SearchForm({ onSearchStart }) {
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [fromCityId, setFromCityId] = useState(null);
  const [toCityId, setToCityId] = useState(null);

  const handleDateChange = (dateData) => {
    setDepartureDate(dateData.startDate || dateData.departureDate);
    setReturnDate(dateData.endDate || dateData.returnDate);
  };

  const handleFromChange = (city, cityId) => {
    setFromCity(city);
    setFromCityId(cityId);
  };

  const handleToChange = (city, cityId) => {
    setToCity(city);
    setToCityId(cityId);
  };

  return (
    <div className="search-form">
      <DirectionGroup 
        onFromChange={handleFromChange}
        onToChange={handleToChange}
      />
      <DateGroup 
        onDateChange={handleDateChange}
        initialStartDate={departureDate}
        initialEndDate={returnDate}
      />
      <SearchButton 
        departureDate={departureDate}
        returnDate={returnDate}
        fromCity={fromCity}
        toCity={toCity}
        fromCityId={fromCityId}
        toCityId={toCityId}
        onSearchStart={onSearchStart}
      />
    </div>
  );
}

export default SearchForm;  