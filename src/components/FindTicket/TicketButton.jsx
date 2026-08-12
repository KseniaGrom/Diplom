import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TicketButton.css';

function TicketButton() {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/choosingplaces');
  };
  
  return (
    <button className="ticket-button"  onClick={handleClick}>
      Выбрать места
    </button>
  );
}

export default TicketButton;