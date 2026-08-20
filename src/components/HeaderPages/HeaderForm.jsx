import React from 'react';
import './HeaderForm.css';
import DirectionGroup from '../Header/DirectionGroup';
import DateGroup from '../Header/DateGroup';
import SearchButton from '../Header/SearchButton';

function HeaderForm({ departureDate, returnDate, onDateChange }) {
  return (
    <div className="header-form-container">
      <div className="header-form-forma">
        <div className="header-form-top">
          <DirectionGroup />
          <DateGroup 
            onDateChange={onDateChange}
            initialStartDate={departureDate}
            initialEndDate={returnDate}
          />
        </div>
        <div className="header-form-bottom">
          <SearchButton 
            departureDate={departureDate}
            returnDate={returnDate}
          />
        </div>
      </div>
    </div>
  );
}

export default HeaderForm;