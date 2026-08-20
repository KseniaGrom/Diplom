import React from 'react';
import { useLocation } from 'react-router-dom';
import './Final.css';
import FinalHeader from '../components/Final/FinalHeader';
import FinalOrder from '../components/Final/FinalOrder';
import FinalInfo from '../components/Final/FinalInfo';
import FinalSuccess from '../components/Final/FinalSuccess';
import FinalRating from '../components/Final/FinalRating';

function Final() {
  const location = useLocation();
  const state = location.state || {};

  const { totalPrice = 0, passengerName = 'Уважаемый пассажир' } = state;

  const getPassengerName = () => {
    if (state.passengerData) {
      const firstPassenger = Object.values(state.passengerData)[0];
      if (firstPassenger) {
        return `${firstPassenger.name || ''} ${firstPassenger.patronymic || ''}`.trim() || 'Уважаемый пассажир';
      }
    }
    return passengerName;
  };

  const displayName = getPassengerName();
  const orderNumber = '285АА';

  return (
    <div className="final">
      <FinalHeader />
      
      <main className="final__main">
        
        <h2 className="final__title">Благодарим Вас за заказ!</h2>
        
        <div className="final__container">
          <FinalOrder orderNumber={orderNumber} totalPrice={totalPrice} />
          <FinalInfo />
          <FinalSuccess passengerName={displayName} />
          <FinalRating />
        </div>
      </main>
    </div>
  );
}

export default Final;