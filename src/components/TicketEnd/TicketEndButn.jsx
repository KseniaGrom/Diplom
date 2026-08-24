import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TicketEndButn.css';

function TicketEndButn({ 
  ticket, 
  adults = 2, 
  children = 1, 
  childrenWithoutSeat = 0,
  adultPrice = 2020,
  childPrice = 1010
}) {
  const navigate = useNavigate();

  const handleClick = () => {

    navigate('/passengers', {
      state: {
        ticket: ticket,
        adults: adults,
        children: children,
        childrenWithoutSeat: childrenWithoutSeat,
        adultPrice: adultPrice,
        childPrice: childPrice
      }
    });
  };

  return (
    <button className="ticketEndButn-button" onClick={handleClick}>
      ДАЛЕЕ
    </button>
  );
}

export default TicketEndButn;