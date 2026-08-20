import React, { useState } from 'react';
import PayPersonal from './PayPersonal';
import PayPayment from './PayPayment';
import PayButton from './PayButton';
import './PayPassengers.css';

function PayPassengers({ 
  passengerData, 
  ticket,
  adults = 0, 
  children = 0, 
  childrenWithoutSeat = 0,
  adultPrice = 0,
  childPrice = 0,
  onPaymentChange
}) {

  const [allPassengers, setAllPassengers] = useState(passengerData || {});
  const [paymentMethod, setPaymentMethod] = useState('Онлайн');
  const [onlineMethod, setOnlineMethod] = useState('Банковской картой');

  const handlePaymentChange = (method, online) => {
    setPaymentMethod(method);
    setOnlineMethod(online);
    if (onPaymentChange) {
      onPaymentChange(method, online);
    }
  };

  const handlePassengerUpdate = (updatedData) => {
    setAllPassengers(updatedData);
  };

  return (
    <div className="pay-passengers">
      <div className="pay-passengers__content">
        <PayPersonal 
          passengerData={passengerData}
          adults={adults}
          children={children}
        />
        
        <PayPayment 
          passengerData={passengerData}
          ticket={ticket}
          adults={adults}
          children={children}
          childrenWithoutSeat={childrenWithoutSeat}
          adultPrice={adultPrice}
          childPrice={childPrice}
          onPaymentChange={handlePaymentChange}
        />
      </div>
      <div className="pay-passengers__button">
        <PayButton
          passengerData={allPassengers}
          ticket={ticket}
          adults={adults}
          children={children}
          childrenWithoutSeat={childrenWithoutSeat}
          adultPrice={adultPrice}
          childPrice={childPrice}
          paymentMethod={paymentMethod}
          onlineMethod={onlineMethod}
        />
      </div>
    </div>
  );
}

export default PayPassengers;