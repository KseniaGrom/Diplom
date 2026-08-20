import React from 'react';
import './TicketCard.css';
import TicketHeader from './TicketHeader';
import TicketRoute from './TicketRoute';
import TicketSeats from './TicketSeats';

function TicketCard({ ticket, departureDate, returnDate }) {  

  return (
    <div className="ticket-card">
      <TicketHeader 
        number={ticket.number} 
        route={ticket.route} 
        name={ticket.name} 
      />
      <div className="ticket-card__routes">
        <TicketRoute 
          departure={ticket.departure} 
          arrival={ticket.arrival} 
          travelTime={ticket.travelTime}
          direction="there"
        />
        
        {ticket.return && (
          <TicketRoute 
            departure={ticket.return.departure} 
            arrival={ticket.return.arrival} 
            travelTime={ticket.return.travelTime}
            direction="back"
          />
        )}
      </div>
      
      <TicketSeats 
        seats={ticket.seats || []} 
        ticket={ticket}
        departureDate={departureDate}
        returnDate={returnDate}
      />
    </div>
  );
}

export default TicketCard;