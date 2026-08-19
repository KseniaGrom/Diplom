import React from 'react';
import '../FindTicket/TicketSeats.css';
import TicketSeat from '../FindTicket/TicketSeat';
import CheckButton from '../Check/CheckButton';
import TicketIcon from '../../Images/ticketIcon.png';

function CheckTrain({ seats, ticket }) {
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
        <CheckButton ticket={ticket} />
      </div>
    </div>
  );
}

export default CheckTrain;