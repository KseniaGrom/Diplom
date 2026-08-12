import React from 'react';
import './DirectionGroup.css';
import arrowIcon from '../../Images/group-arrow.png';
import locationIcon from '../../Images/point.png';

function DirectionGroup() {
  return (
    <div className="direction-group">
      <label className="direction-group__label">Направление</label>
      <div className="direction-group__inputs">
        <div className="direction-group__input-wrapper">
          <input
            type="text"
            className="direction-group__input"
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
          <input
            type="text"
            className="direction-group__input"
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