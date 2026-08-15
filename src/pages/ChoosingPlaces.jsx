import React from 'react';
import { useLocation } from 'react-router-dom';
import './Tickets.css';
import HeaderPages from '../components/HeaderPages/HeaderPages';
import Sidebar from '../components/Sidebar/Sidebar';
import LastTicket from '../components/LastTicket/LastTicket';
import ChooseSeats from '../components/ChooseSeats/ChooseSeats';
import TicketEnd from '../components/TicketEnd/TicketEnd';

function ChoosingPlaces() {
  const location = useLocation();
  const { ticket } = location.state || {};

  if (!ticket) {
    return (
      <div className="tickets">
        <HeaderPages currentStep={1} />
        <div className="tickets__error">
          <p>Билет не выбран. Вернитесь и выберите билет.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tickets">
      <HeaderPages currentStep={1} /> 
      <main className="tickets__main">
        <div className="tickets__left">
          <Sidebar />
          <LastTicket />
        </div>
        <div>
          <ChooseSeats ticket={ticket} />
          <TicketEnd ticket={ticket} />
        </div>
      </main>
    </div>
  );
}

export default ChoosingPlaces;