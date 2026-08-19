import React from 'react';
import './CheckCard.css';
import TicketHeader from '../FindTicket/TicketHeader';
import TicketRoute from '../FindTicket/TicketRoute';
import CheckTrain from './CheckTrain';
import CheckSectionHeader from './CheckSectionHeader';

function CheckCard({ ticket }) {
  return (
    <div className="checkcard">
        <CheckSectionHeader title="Поезд" />
        <div className="сheckсard-card">
        <TicketHeader 
            number={ticket.number} 
            route={ticket.route} 
            name={ticket.name} 
        />
        <div className="сheckсard__routes">
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
        
        <CheckTrain seats={ticket.seats} ticket={ticket} />
        </div>
    </div>
  );
}

export default CheckCard;