import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TicketEndButton.css';

function TicketEndButton() {
  const navigate = useNavigate();

  return (
    <button className="tickedend-btn" onClick={() => navigate('/tickets')}>
      Выбрать другой поезд
    </button>
  );
}

export default TicketEndButton;