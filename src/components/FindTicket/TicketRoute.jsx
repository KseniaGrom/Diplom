import React from 'react';
import './TicketRoute.css';
import TicketPoint from './TicketPoint';
import TicketTravel from './TicketTravel';
import arrowRightIcon from '../../Images/FindTicket/strelkaright.png';
import arrowLeftIcon from '../../Images/FindTicket/strelkaleft.png';

function TicketRoute({ departure, arrival, travelTime, direction = 'there', label }) {
  const arrowIcon = direction === 'back' ? arrowLeftIcon : arrowRightIcon;

  return (
    <div className="ticket-route">
      {label && <span className="ticket-route__label">{label}</span>}
      <div className="ticket-route__points">
        <TicketPoint 
          time={departure.time} 
          city={departure.city} 
          station={departure.station} 
        />
        <TicketTravel travelTime={travelTime} arrowIcon={arrowIcon} />
        <TicketPoint 
          time={arrival.time} 
          city={arrival.city} 
          station={arrival.station} 
        />
      </div>
    </div>
  );
}

export default TicketRoute;