import React, { useState } from 'react';
import './TicketSeat.css';
import rubIcon from '../../Images/rubl.png';

function TicketSeat({ seat, top, bottom, topPrice, bottomPrice }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const hasTopBottom = top !== undefined || bottom !== undefined;

  return (
    <div className="ticket-seat">
      <span className="ticket-seat__type">{seat.type}</span>
      
      <div className="ticket-seat__count-wrapper">
        <span 
          className="ticket-seat__count"
          onMouseEnter={() => hasTopBottom && setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {seat.count}
        </span>
        
        {showTooltip && hasTopBottom && (
          <div className="ticket-seat__tooltip">
            {top !== undefined && (
              <div className="ticket-seat__tooltip-row">
                <span className="ticket-seat__tooltip-label">верхние</span>
                <span className="ticket-seat__tooltip-count">{top}</span>
                <span className="ticket-seat__tooltip-price">{topPrice || seat.price}</span>
                <img src={rubIcon} alt="₽" className="ticket-seat__tooltip-rub" />
              </div>
            )}
            {bottom !== undefined && (
              <div className="ticket-seat__tooltip-row">
                <span className="ticket-seat__tooltip-label">нижние</span>
                <span className="ticket-seat__tooltip-count">{bottom}</span>
                <span className="ticket-seat__tooltip-price">{bottomPrice || seat.price}</span>
                <img src={rubIcon} alt="₽" className="ticket-seat__tooltip-rub" />
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="ticket-seat__price-group">
        <span className="ticket-seat__price-text">от</span>
        <span className="ticket-seat__price">{seat.price}</span>
        <img 
          src={rubIcon} 
          alt="₽" 
          className="ticket-seat__rub-icon" 
        />
      </div>
    </div>
  );
}

export default TicketSeat;