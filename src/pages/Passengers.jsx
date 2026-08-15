import React from 'react';
import HeaderPages from '../components/HeaderPages/HeaderPages';
import Sidebar from '../components/Sidebar/Sidebar';
import LastTicket from '../components/LastTicket/LastTicket';
import Find from '../components/Find/Find';
import FindTicket from '../components/FindTicket/FindTicket';

function Passengers() {
  return (
    <div className="passengers">
      <HeaderPages currentStep={2} />
      <main className="passengers__main">
        <div className="passengers__left">
          <Sidebar />
          <LastTicket />
        </div>
        <FindTicket />
      </main>
    </div>
  );
}

export default Passengers;