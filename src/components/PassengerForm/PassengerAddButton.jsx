import React from 'react';
import './PassengerAddButton.css';
import plusIcon from '../../Images/PassengerForm/plus.png';

function PassengerAddButton({ onClick }) {
  return (
    <div className="passenger-add-button" onClick={onClick}>
      <div className="passenger-add-button__header">
        <div className="passenger-add-button__left">
          <span className="passenger-add-button__title">Добавить пассажира</span>
        </div>
        <div className="passenger-add-button__right">
          <img 
            alt="добавить" 
            className="passenger-add-button__icon" 
            src={plusIcon}
          />
        </div>
      </div>
    </div>
  );
}

export default PassengerAddButton;