import React from 'react';
import DirectionGroup from './DirectionGroup';
import DateGroup from './DateGroup';
import SearchButton from './SearchButton';
import './SearchForm.css';

function SearchForm() {
  return (
    <div className="search-form">
      <DirectionGroup />
      <DateGroup />
      <SearchButton />
    </div>
  );
}

export default SearchForm;