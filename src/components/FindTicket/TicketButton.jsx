import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TicketButton.css';

function TicketButton({ ticket }) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    
    navigate('/choosingplaces', {
      state: {
        ticket: ticket,
        adults: 2,
        children: 1,
        childrenWithoutSeat: 0
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