import React from 'react';
import './TicketHeader.css';
import trainIcon from '../../Images/FindTicket/train.png';
import arrowIcon from '../../Images/FindTicket/arrow.png';
import arrowBlackIcon from '../../Images/FindTicket/arrowblack.png';

function TicketHeader({ number, route, name }) {
  return (
    <div className="ticket-header">
      <img 
        src={trainIcon} 
        alt="поезд" 
        className="ticket-header__train-icon" 
      />
      <span className="ticket-header__number">{number}</span>
      <div className="ticket-header__route">
        {route.map((city, index) => (
          <div key={index} className="ticket-header__city-wrapper">
            <span 
              className={`ticket-header__city ${index === 0 ? 'ticket-header__city--first' : ''}`}
            >
              {city}
            </span>
            {index < route.length - 1 && (
              <img 
                src={index === route.length - 2 ? arrowBlackIcon : arrowIcon}
                alt="→" 
                className="ticket-header__arrow" 
              />
            )}
          </div>
        ))}
        {name && <span className="ticket-header__name">«{name}»</span>}
      </div>
    </div>
  );
}

export default TicketHeader;