import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Tickets.css';
import HeaderPages from '../components/HeaderPages/HeaderPages';
import Sidebar from '../components/Sidebar/Sidebar';
import LastTicket from '../components/LastTicket/LastTicket';
import FindTicket from '../components/FindTicket/FindTicket';

function Tickets() {
  const location = useLocation();
  const state = location.state || {};
  
  const [departureDate, setDepartureDate] = useState(
    state.departureDate ? new Date(state.departureDate) : null
  );
  const [returnDate, setReturnDate] = useState(
    state.returnDate ? new Date(state.returnDate) : null
  );

  return (
    <div className="tickets">
      <HeaderPages currentStep={1} />
      <main className="tickets__main">
        <div className="tickets__left">
          <Sidebar 
            departureDate={departureDate}
            returnDate={returnDate}
          />
          <LastTicket />
        </div>
        <FindTicket 
          departureDate={departureDate}
          returnDate={returnDate}
        />
      </main>
    </div>
    
  );
}

export default Tickets;