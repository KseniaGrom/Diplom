import React, { useState } from 'react';
import DirectionGroup from './DirectionGroup';
import DateGroup from './DateGroup';
import SearchButton from './SearchButton';
import './SearchForm.css';

function SearchForm({ onSearchStart }) {
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);

  const handleDateChange = (dateData) => {
    setDepartureDate(dateData.startDate || dateData.departureDate);
    setReturnDate(dateData.endDate || dateData.returnDate);
  };

  return (
    <div className="search-form">
      <DirectionGroup />
      <DateGroup 
        onDateChange={handleDateChange}
        initialStartDate={departureDate}
        initialEndDate={returnDate}
      />
      <SearchButton 
        departureDate={departureDate}
        returnDate={returnDate}
        onSearchStart={onSearchStart}
      />
    </div>
  );
}

export default SearchForm;