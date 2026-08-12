import React from 'react';
import './TicketTravel.css';
import arrowIcon from '../../Images/FindTicket/strelkaright.png';  

function TicketTravel({ travelTime, arrowIcon }) {
  return (
    <div className="ticket-travel">
      <span className="ticket-travel__time">{travelTime}</span>
      <img 
        src={arrowIcon} 
        alt="" 
        className="ticket-travel__arrow" 
      />
    </div>
  );
}

export default TicketTravel;