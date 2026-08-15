import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TicketEndButn.css';

function TicketEndButn() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/passengers');
  };

  return (
    <button className="ticketEndButn-button" onClick={handleClick}>
      ДАЛЕЕ
    </button>
  );
}

export default TicketEndButn;