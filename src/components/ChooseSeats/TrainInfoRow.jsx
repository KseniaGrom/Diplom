import React from 'react';
import './TrainInfoRow.css';
import clockIcon from '../../Images/clock.png';
import routeArrowIcon from '../../Images/FindTicket/arrow.png';
import trainIcon from '../../Images/train-orange.png';
import TicketRouteSimple from '../ChooseSeats/TicketRouteSimple';

function TrainInfoRow({ ticket }) {
  if (!ticket) {
    return null;
  }

  const getHoursAndMinutes = (time) => {
    if (!time) return { hours: '0', minutes: '00' };
    const parts = time.split(':');
    return {
      hours: parts[0] || '0',
      minutes: parts[1] || '00'
    };
  };

  const { hours, minutes } = getHoursAndMinutes(ticket.travelTime);

  return (
    <div className="train-info__row">
      <div className="train-info__header">
        <img 
          src={trainIcon} 
          alt="поезд" 
          className="train-info__train-icon" 
        />
        <div className="train-info__header-content">
          <span className="train-info__number">{ticket.number || 'N/A'}</span>
          <div className="train-info__route">
            {ticket.route?.map((city, index) => (
              <div key={index} className="train-info__route-item">
                <span 
                  className={`train-info__route-city ${index === 0 ? 'train-info__route-city--first' : ''}`}
                >
                  {city}
                </span>
                {index < ticket.route.length - 1 && (
                  <img 
                    src={routeArrowIcon} 
                    alt="→" 
                    className="train-info__route-arrow" 
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="train-info-routesimpl">
        <TicketRouteSimple 
          departure={ticket.departure} 
          arrival={ticket.arrival} 
        />
      </div>

      <div className="train-info__duration">
        <img src={clockIcon} alt="часы" className="train-info__clock" />
        <div className="train-info__duration-wrapper">
          <div className="train-info__duration-item">
            <span className="train-info__duration-time">{hours}</span>
            <span className="train-info__duration-label">часов</span>
          </div>
          <div className="train-info__duration-item">
            <span className="train-info__duration-time">{minutes}</span>
            <span className="train-info__duration-label">минут</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainInfoRow;