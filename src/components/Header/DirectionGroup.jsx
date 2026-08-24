import React, { useState } from 'react';
import './DirectionGroup.css';
import arrowIcon from '../../Images/group-arrow.png';
import locationIcon from '../../Images/point.png';
import CityAutocomplete from '../CityAutocomplete/CityAutocomplete';

function DirectionGroup({ onFromChange, onToChange }) {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [fromCityId, setFromCityId] = useState(null);
  const [toCityId, setToCityId] = useState(null);

  const handleFromSelect = (city, cityId) => {
    setFromCity(city);
    setFromCityId(cityId);
    if (onFromChange) {
      onFromChange(city, cityId);
    }
  };

  const handleToSelect = (city, cityId) => {
    setToCity(city);
    setToCityId(cityId);
    if (onToChange) {
      onToChange(city, cityId);
    }
  };

  return (
    <div className="direction-group">
      <label className="direction-group__label">Направление</label>
      <div className="direction-group__inputs">
        <div className="direction-group__input-wrapper">
          <CityAutocomplete
            placeholder="Откуда"
            value={fromCity}
            onChange={handleFromSelect}
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
            placeholder="Куда"
            value={toCity}
            onChange={handleToSelect}
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