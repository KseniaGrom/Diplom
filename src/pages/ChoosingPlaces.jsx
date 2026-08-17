import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Tickets.css';
import HeaderPages from '../components/HeaderPages/HeaderPages';
import Sidebar from '../components/Sidebar/Sidebar';
import LastTicket from '../components/LastTicket/LastTicket';
import ChooseSeats from '../components/ChooseSeats/ChooseSeats';
import TicketEnd from '../components/TicketEnd/TicketEnd';
import TicketEndButn from '../components/TicketEnd/TicketEndButn';
import Error from '../components/Error/Error';

function ChoosingPlaces() {
  const location = useLocation();
  const navigate = useNavigate();
  const { ticket, adults = 2, children = 1, childrenWithoutSeat = 0 } = location.state || {};
  const [adultPrice, setAdultPrice] = useState(2020);
  const [childPrice, setChildPrice] = useState(1010);

  const handlePriceChange = (adult, child) => {
    setAdultPrice(adult);
    setChildPrice(child);
  };

  const handleContinue = () => {
    navigate('/passengers', {
      state: {
        ticket: ticket,
        adults: adults,
        children: children,
        childrenWithoutSeat: childrenWithoutSeat,
        adultPrice: adultPrice,
        childPrice: childPrice
      }
    });
  };

  if (!ticket) {
    return (
      <Error 
        onClose={() => navigate('/tickets')}
        onHome={() => navigate('/tickets')}
      />
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
          <ChooseSeats 
            ticket={ticket} 
            onPriceChange={handlePriceChange}
          />
          <TicketEnd ticket={ticket} />
        </div>
      </main>
    </div>
  );
}

export default ChoosingPlaces;