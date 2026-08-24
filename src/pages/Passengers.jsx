import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Passengers.css';
import HeaderPages from '../components/HeaderPages/HeaderPages';
import TripDetails from '../components/TripDetails/TripDetails';
import PassengerForm from '../components/PassengerForm/PassengerForm';
import Error from '../components/Error/Error';

function Passengers() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { 
    ticket, 
    adults = 2, 
    children = 1, 
    childrenWithoutSeat = 0,
    adultPrice = 2020,
    childPrice = 1010
  } = location.state || {};


  if (!ticket) {
    return (
      <Error 
        onClose={() => navigate('/tickets')}
        onHome={() => navigate('/tickets')}
      />
    );
  }

  return (
    <div className="passengers">
      <HeaderPages currentStep={2} />
      <main className="passengers__main">
        <div className="passengers__left">
          <TripDetails 
            ticket={ticket}
            adults={adults}
            children={children}
            childrenWithoutSeat={childrenWithoutSeat}
            adultPrice={adultPrice}
            childPrice={childPrice}
          />
        </div>
        <div className="passengers__right">
          <PassengerForm 
            ticket={ticket}
            adults={adults}
            children={children}
            childrenWithoutSeat={childrenWithoutSeat}
            adultPrice={adultPrice}
            childPrice={childPrice}
          />
        </div>
      </main>
    </div>
  );
}

export default Passengers;