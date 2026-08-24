import React from 'react';
import './TicketRoute.css';
import TicketPoint from './TicketPoint';
import TicketTravel from './TicketTravel';
import arrowRightIcon from '../../Images/FindTicket/strelkaright.png';
import arrowLeftIcon from '../../Images/FindTicket/strelkaleft.png';

function TicketRoute({ departure, arrival, travelTime, direction = 'there', label }) {

  if (!departure || !arrival) {
    console.warn('⚠️ TicketRoute: нет данных о маршруте', { departure, arrival });
    return null;
  }

  const arrowIcon = direction === 'back' ? arrowLeftIcon : arrowRightIcon;

  return (
    <div className="ticket-route">
      <div className="ticket-route__points">
        <TicketPoint 
          time={departure.time || '00:00'} 
          city={departure.city || ''} 
          station={departure.station || ''} 
        />
        <TicketTravel travelTime={travelTime || '0:00'} arrowIcon={arrowIcon} />
        <TicketPoint 
          time={arrival.time || '00:00'} 
          city={arrival.city || ''} 
          station={arrival.station || ''} 
        />
      </div>
    </div>
  );
}

export default TicketRoute;