import React, { useState } from 'react';
import './TicketInfoThere.css';
import minusIcon from '../../Images/SideThere/plus-act.png';
import plusIcon from '../../Images/SideThere/pluse.png';
import arrowIcon from '../..//Images/FindTicket/strelkaright.png';
import ThereIcon from '../../Images/SideThere/there.png';

function TicketInfoThere({ ticket }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (!ticket) {
    return null;
  }

  return (
    <div className="ticket-info-there">
      <div className="ticket-info-there__header" onClick={toggleExpand}>
        <div className="ticket-info-there__title-group">
          <img 
            src={ThereIcon} 
            alt="Туда" 
            className="ticket__icon" 
          />
          <span className="ticket-info-there__title">Туда</span>
          <span className="ticket-info-there__date">
            {ticket.departure?.date || '30.08.2018'}
          </span>
        </div>
        <div className="ticket-info-there__toggle">
          <img 
            src={isExpanded ? minusIcon : plusIcon} 
            alt={isExpanded ? 'свернуть' : 'развернуть'} 
            className="ticket-info-there__toggle-icon"
          />
        </div>
      </div>

      {isExpanded && (
        <div className="ticket-info-there__body">
          <div className="ticket-info-there__train">
            <div className="ticket-info-there__train-number-group">
              <span className="ticket-info-there__train-label">№ Поезда</span>
              <span className="ticket-info-there__train-number">
                {ticket.number || '116С'}
              </span>
            </div>
            <div className="ticket-info-there__train-name-group">
              <span className="ticket-info-there__train-label">Название</span>
              <div className="ticket-info-there__train-name">
                {ticket.route?.map((city, index) => (
                  <span key={index}>
                    {city}
                    {index < ticket.route.length - 1 && <br />}
                  </span>
                )) || 'Адлер\nСанкт-Петербург'}
              </div>
            </div>
          </div>

          <div className="ticket-info-there__duration">
            <span className="ticket-info-there__duration-time">
              {ticket.travelTime || '9 : 42'}
            </span>
          </div>

          <div className="ticket-info-there__arrow">
            <img src={arrowIcon} alt="→" className="ticket-info-there__arrow-icon" />
          </div>

          <div className="ticket-info-there__route">
            <div className="ticket-info-there__point">
              <span className="ticket-info-there__time">
                {ticket.departure?.time || '00:10'}
              </span>
              <span className="ticket-info-there__date">
                {ticket.departure?.date || '30.08.2018'}
              </span>
              <span className="ticket-info-there__city">
                {ticket.departure?.city || 'Москва'}
              </span>
              <span className="ticket-info-there__station">
                {ticket.departure?.station || 'Курский вокзал'}
              </span>
            </div>
            <div className="ticket-info-there__point ticket-info-there__point--right">
              <span className="ticket-info-there__time">
                {ticket.arrival?.time || '09:52'}
              </span>
              <span className="ticket-info-there__date">
                {ticket.arrival?.date || '31.08.2018'}
              </span>
              <span className="ticket-info-there__city">
                {ticket.arrival?.city || 'Санкт-Петербург'}
              </span>
              <span className="ticket-info-there__station">
                {ticket.arrival?.station || 'Ладожский вокзал'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TicketInfoThere;