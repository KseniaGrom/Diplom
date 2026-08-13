import React from 'react';
import './TicketSeats.css';
import TicketSeat from './TicketSeat';
import TicketButton from './TicketButton';
import TicketIcon from '../../Images/ticketIcon.png';

function TicketSeats({ seats, ticket }) {
  return (
    <div className="ticket-seats">
      <div className="ticket-seats__list">
        {seats.map((seat, index) => (
          <TicketSeat key={index} seat={seat} />
        ))}
      </div>
      <div className="ticket-seats__action">
        <img 
          src={TicketIcon} 
          alt="билет" 
          className="ticket-seats__icon" 
        />
        <TicketButton ticket={ticket} />
      </div>
    </div>
  );
}

export default TicketSeats;