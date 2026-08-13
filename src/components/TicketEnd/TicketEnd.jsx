import React from 'react';
import './TicketEnd.css';
import TicketEndButton from './TicketEndButton';
import arrowIcon from '../../Images/BtninfoRight.png';

function TicketEnd({ ticket }) {
  return (
    <div className="ticketend">
      <div className="ticketend__change-container">
        <div className="ticketend__change-button">
          <img src={arrowIcon} alt="←" className="ticketend-btn__icon" />
          <TicketEndButton />
        </div>
      </div>
    </div>
  );
}

export default TicketEnd;