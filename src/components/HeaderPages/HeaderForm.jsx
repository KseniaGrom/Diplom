import React from 'react';
import './HeaderForm.css';
import DirectionGroup from '../Header/DirectionGroup'
import DateGroup from '../Header/DateGroup'
import SearchButton from '../Header/SearchButton'

function HeaderForm() {
  return (
    <div className="header-form-container">
        <div className="header-form-forma">
            <div className="header-form-top">
                <DirectionGroup />
                <DateGroup />
            </div>
            <div className="header-form-bottom">
                <SearchButton />
            </div>
        </div>

    </div>
  );
}

export default HeaderForm;