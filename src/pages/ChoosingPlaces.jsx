import React from 'react';
import './Tickets.css';
import HeaderPages from '../components/HeaderPages/HeaderPages';
import Sidebar from '../components/Sidebar/Sidebar';
import LastTicket from '../components/LastTicket/LastTicket';

function ChoosingPlaces() {
  return (
    <div className="tickets">
      <HeaderPages currentStep={1} /> 
      <main className="tickets__main">
        <div className="tickets__left">
          <Sidebar />
          <LastTicket />
        </div>

      </main>
    </div>
  );
}

export default ChoosingPlaces;