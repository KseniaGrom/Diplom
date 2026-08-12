import React from 'react';
import './TicketPoint.css';

function TicketPoint({ time, city, station }) {
  return (
    <div className="ticket-point">
      <span className="ticket-point__time">{time}</span>
      <span className="ticket-point__city">{city}</span>
      <span className="ticket-point__station">{station}</span>
    </div>
  );
}

export default TicketPoint;