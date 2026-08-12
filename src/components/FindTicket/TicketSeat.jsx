import React from 'react';
import './TicketSeat.css';
import rubIcon from '../../Images/rubl.png';

function TicketSeat({ seat }) {
  return (
    <div className="ticket-seat">
      <span className="ticket-seat__type">{seat.type}</span>
      <span className="ticket-seat__count">{seat.count}</span>
      <div className="ticket-seat__price-group">
        <span className="ticket-seat__price-text">от</span>
        <span className="ticket-seat__price">{seat.price}</span>
        <img 
          src={rubIcon} 
          alt="₽" 
          className="ticket-seat__rub-icon" 
        />
      </div>
    </div>
    
  );
}

export default TicketSeat;