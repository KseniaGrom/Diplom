import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckActions.css';

function CheckActions({ 
  onConfirm, 
  ticket, 
  passengers, 
  price, 
  payment 
}) {
  const navigate = useNavigate();

  const getPassengerName = () => {
    if (passengers && passengers.length > 0) {
      const firstPassenger = passengers[0];
      return `${firstPassenger.name || ''} ${firstPassenger.patronymic || ''}`.trim() || 'Уважаемый пассажир';
    }
    return 'Уважаемый пассажир';
  };

  const passengerName = getPassengerName();
  const totalPrice = price?.totalPrice || 0;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    
    navigate('/final', {
      state: {
        totalPrice: totalPrice,
        passengerName: passengerName,
        passengerData: passengers,
        ticket: ticket,
        payment: payment,
        price: price
      }
    });
  };

  return (
    <div className="check-actions">
      <button 
        className="check-actions__button check-actions__button--confirm"
        onClick={handleConfirm}
      >
        Подтвердить
      </button>
    </div>
  );
}

export default CheckActions;