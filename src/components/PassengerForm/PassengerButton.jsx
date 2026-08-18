import React from 'react';
import './PassengerButton.css';

function PassengerButton({ onClick }) {
  return (
    <button className="passenger-next-button" onClick={onClick}>
      Следующий пассажир
    </button>
  );
}

export default PassengerButton;