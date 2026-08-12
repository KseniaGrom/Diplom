import React from 'react';
import './DateGroup.css';
import DataIcon from '../../Images/DataIcon.png';

function DateGroup() {
  return (
    <div className="date-group">
      <label className="date-group__label">Дата</label>
      <div className="date-inputs">
        <div className="date__input-wrapper">
          <input 
            type="data" 
            className="date-inputs__field" 
            placeholder="ДД/ММ/ГГГГ" 
          />
          <img 
            src={DataIcon} 
            alt="" 
            className="date__input-icon" 
          />
        </div>
        <div className="date__input-wrapper">
          <input 
            type="data" 
            className="date-inputs__field" 
            placeholder="ДД/ММ/ГГГГ" 
          />
          <img 
            src={DataIcon} 
            alt="" 
            className="date__input-icon" 
          />
        </div>
        </div>
    </div>
  );
}

export default DateGroup;