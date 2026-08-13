import React from 'react';
import './TicketRouteSimple.css';
import TicketPoint from '../FindTicket/TicketPoint';
import arrowRightIcon from '../../Images/FindTicket/strelkaright.png';
import arrowLeftIcon from '../../Images/FindTicket/strelkaleft.png';

function TicketRouteSimple({ departure, arrival, direction = 'there', label }) {
  const arrowIcon = direction === 'back' ? arrowLeftIcon : arrowRightIcon;

  return (
    <div className="ticket-route-simple">
      <div className="ticket-route-simple__points">
        <TicketPoint 
          time={departure.time} 
          city={departure.city} 
          station={departure.station} 
        />
        <img 
          src={arrowIcon} 
          alt="→" 
          className="ticket-route-simple__arrow" 
        />
        <TicketPoint 
          time={arrival.time} 
          city={arrival.city} 
          station={arrival.station} 
        />
      </div>
    </div>
  );
}

export default TicketRouteSimple;