import React, { useState } from 'react';
import './DirectionGroup.css';
import arrowIcon from '../../Images/group-arrow.png';
import locationIcon from '../../Images/point.png';
import CityAutocomplete from '../CityAutocomplete/CityAutocomplete';

function DirectionGroup() {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');

  return (
    <div className="direction-group">
      <label className="direction-group__label">Направление</label>
      <div className="direction-group__inputs">
        <div className="direction-group__input-wrapper">
          <CityAutocomplete
            value={fromCity}
            onChange={setFromCity}
            placeholder="Откуда"
          />
          <img 
            src={locationIcon} 
            alt="" 
            className="direction-group__input-icon" 
          />
        </div>
        
        <img 
          src={arrowIcon} 
          alt="" 
          className="direction-group__arrow" 
        />
        
        <div className="direction-group__input-wrapper">
          <CityAutocomplete
            value={toCity}
            onChange={setToCity}
            placeholder="Куда"
          />
          <img 
            src={locationIcon} 
            alt="" 
            className="direction-group__input-icon" 
          />
        </div>
      </div>
    </div>
  );
}

export default DirectionGroup;