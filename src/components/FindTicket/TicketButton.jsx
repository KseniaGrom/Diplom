import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TicketButton.css';

function TicketButton({ 
  ticket, 
  adults = 2, 
  children = 1, 
  childrenWithoutSeat = 0,
  departureDate,
  returnDate
}) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/choosingplaces', {
      state: {
        ticket: ticket,
        adults: adults,
        children: children,
        childrenWithoutSeat: childrenWithoutSeat,
        departureDate: departureDate ? departureDate.toISOString() : null,
        returnDate: returnDate ? returnDate.toISOString() : null,
      }
    });
  };
  
  return (
    <button className="ticket-button" onClick={handleClick}>
      Выбрать места
    </button>
  );
}

export default TicketButton;