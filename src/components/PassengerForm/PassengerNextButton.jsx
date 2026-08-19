import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PassengerNextButton.css';

function PassengerNextButton({ 
  onClick, 
  passengerData, 
  ticket,
  adults, 
  children, 
  childrenWithoutSeat, 
  adultPrice, 
  childPrice 
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    
    navigate('/pay', {
      state: {
        ticket: ticket,
        adults: adults,
        children: children,
        childrenWithoutSeat: childrenWithoutSeat,
        adultPrice: adultPrice,
        childPrice: childPrice,
        passengerData: passengerData
      }
    });
  };

  return (
    <button className="passengernextbutton" onClick={handleClick}>
      Далее
    </button>
  );
}

export default PassengerNextButton;