import React, { useState } from 'react';
import './TicketInfBack.css';
import minusIcon from '../../Images/SideThere/plus-act.png';
import plusIcon from '../../Images/SideThere/pluse.png';
import arrowIcon from '../..//Images/FindTicket/strelkaleft.png';
import BackIcon from '../../Images/SideBack/back.png';

function TicketInfBack({ ticket }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (!ticket) {
    return null;
  }

  return (
    <div className="ticket-info-back">
      <div className="ticket-info-back__header" onClick={toggleExpand}>
        <div className="ticket-info-back__title-group">
          <img 
            src={BackIcon} 
            alt="Обратно" 
            className="ticket__icon" 
          />
          <span className="ticket-info-back__title">Обратно</span>
          <span className="ticket-info-back__date">
            {ticket.departure?.date || '09.09.2018'}
          </span>
        </div>
        <div className="ticket-info-back__toggle">
          <img 
            src={isExpanded ? minusIcon : plusIcon} 
            alt={isExpanded ? 'свернуть' : 'развернуть'} 
            className="ticket-info-back__toggle-icon"
          />
        </div>
      </div>

      {isExpanded && (
        <div className="ticket-info-back__body">
          <div className="ticket-info-back__train">
            <div className="ticket-info-back__train-number-group">
              <span className="ticket-info-back__train-label">№ Поезда</span>
              <span className="ticket-info-back__train-number">
                {ticket.number || '116С'}
              </span>
            </div>
            <div className="ticket-info-back__train-name-group">
              <span className="ticket-info-back__train-label">Название</span>
              <div className="ticket-info-back__train-name">
                {ticket.route?.map((city, index) => (
                  <span key={index}>
                    {city}
                    {index < ticket.route.length - 1 && <br />}
                  </span>
                )) || 'Адлер\nСанкт-Петербург'}
              </div>
            </div>
          </div>

          <div className="ticket-info-back__duration">
            <span className="ticket-info-back__duration-time">
              {ticket.travelTime || '9 : 42'}
            </span>
          </div>

          <div className="ticket-info-back__time-row">
            <div className="ticket-info-back__time-point">
              <span className="ticket-info-back__time">
                {ticket.departure?.time || '00:10'}
              </span>
              <span className="ticket-info-back__date">
                {ticket.departure?.date || '09.09.2018'}
              </span>
            </div>

            <div className="ticket-info-back__arrow">
              <img src={arrowIcon} alt="←" className="ticket-info-back__arrow-icon" />
            </div>

            <div className="ticket-info-back__time-point ticket-info-back__time-point--right">
              <span className="ticket-info-back__time">
                {ticket.arrival?.time || '09:52'}
              </span>
              <span className="ticket-info-back__date">
                {ticket.arrival?.date || '08.09.2018'}
              </span>
            </div>
          </div>

          <div className="ticket-info-back__station-row">
            <div className="ticket-info-back__station-point">
              <span className="ticket-info-back__city">
                {ticket.departure?.city || 'Москва'}
              </span>
              <span className="ticket-info-back__station">
                {ticket.departure?.station || 'Курский вокзал'}
              </span>
            </div>

            <div className="ticket-info-back__station-point ticket-info-back__station-point--right">
              <span className="ticket-info-back__city">
                {ticket.arrival?.city || 'Санкт-Петербург'}
              </span>
              <span className="ticket-info-back__station">
                {ticket.arrival?.station || 'Ладожский вокзал'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TicketInfBack;