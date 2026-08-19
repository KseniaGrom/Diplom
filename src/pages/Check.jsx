import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Check.css';
import HeaderPages from '../components/HeaderPages/HeaderPages';
import TripDetails from '../components/TripDetails/TripDetails';
import CheckCard from '../components/Check/CheckCard';
import CheckPassengers from '../components/Check/CheckPassengers';
import CheckPrice from '../components/Check/CheckPrice';
import CheckPayment from '../components/Check/CheckPayment';
import CheckActions from '../components/Check/CheckActions';
import Error from '../components/Error/Error';

function Check() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || {};

  const { 
    ticket, 
    passengers, 
    price, 
    payment 
  } = state;


  if (!ticket || !passengers) {
    return (
      <Error 
        onClose={() => navigate('/')}
        onHome={() => navigate('/')}
      />
    );
  }

  return (
    <div className="check">
      <HeaderPages currentStep={4} />
      
      <main className="check__main">
        <div className="check__left">
          <TripDetails 
            ticket={ticket}
            adults={price?.adults || 0}
            children={price?.children || 0}
            childrenWithoutSeat={price?.childrenWithoutSeat || 0}
            adultPrice={price?.adultPrice || 0}
            childPrice={price?.childPrice || 0}
          />
        </div>

        <div className="check__right">
          <div className="check__container">

            <div className="check__section">
              <CheckCard ticket={ticket} />
            </div>

            <div className="check__section">
              <CheckPassengers passengers={passengers} price={price} />
            </div>
            
            <div className="check__section">
              <h2 className="check__section-title">Способ оплаты</h2>
              <CheckPayment payment={payment} />
            </div>

            <CheckActions />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Check;