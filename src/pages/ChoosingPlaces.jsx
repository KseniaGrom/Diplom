import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ChoosingPlaces.css';
import HeaderPages from '../components/HeaderPages/HeaderPages';
import Sidebar from '../components/Sidebar/Sidebar';
import LastTicket from '../components/LastTicket/LastTicket';
import ChooseSeats from '../components/ChooseSeats/ChooseSeats';
import Error from '../components/Error/Error';

function ChoosingPlaces() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || {};
  
  const { ticket, adults = 2, children = 1, childrenWithoutSeat = 0 } = state;
  
  const [adultPrice, setAdultPrice] = useState(2020);
  const [childPrice, setChildPrice] = useState(1010);
  
  const [departureDate, setDepartureDate] = useState(
    state.departureDate ? new Date(state.departureDate) : null
  );
  const [returnDate, setReturnDate] = useState(
    state.returnDate ? new Date(state.returnDate) : null
  );

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
        childPrice: childPrice,
        departureDate: departureDate?.toISOString(),
        returnDate: returnDate?.toISOString(),
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
    <div className="choosingplaces">
      <HeaderPages currentStep={1} />
      <main className="choosingplaces__main">
        <div className="choosingplaces__left">
          <Sidebar 
            departureDate={departureDate}
            returnDate={returnDate}
          />
          <LastTicket />
        </div>
        <ChooseSeats 
          ticket={ticket}
          adults={adults}
          children={children}
          childrenWithoutSeat={childrenWithoutSeat}
          onPriceChange={handlePriceChange}
        />
      </main>
    </div>
  );
}

export default ChoosingPlaces;