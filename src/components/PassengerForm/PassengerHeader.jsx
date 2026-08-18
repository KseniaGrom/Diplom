import React from 'react';
import './PassengerHeader.css';
import closeIcon from '../../Images/PassengerForm/close.png';

function PassengerHeader({ 
  index, 
  isExpanded, 
  onToggle, 
  onRemove, 
  showRemove = true 
}) {
  return (
    <div 
      className={`passenger-header ${isExpanded ? 'passenger-header--expanded' : 'passenger-header--collapsed'}`}
      onClick={onToggle}
    >
      <div className="passenger-header__left">
        <span 
          className={`passenger-header__toggle-icon ${
            isExpanded 
              ? 'passenger-header__toggle-icon--minus' 
              : 'passenger-header__toggle-icon--circle-plus'
          }`}
        />
        <span className="passenger-header__title">Пассажир {index}</span>
      </div>
      <div className="passenger-header__right">
        {showRemove && (
          <img 
            src={closeIcon} 
            alt="удалить" 
            className="passenger-header__close-icon"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
          />
        )}
      </div>
    </div>
  );
}

export default PassengerHeader;