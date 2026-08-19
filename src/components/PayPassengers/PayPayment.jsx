import React, { useState } from 'react';
import PayPersonalHeader from './PayPersonalHeader';
import './PayPayment.css';
import PayButton from './PayButton';

function PayPayment({ 
  passengerData, 
  ticket,
  adults, 
  children, 
  childrenWithoutSeat, 
  adultPrice, 
  childPrice 
}) {
  const [selectedMethod, setSelectedMethod] = useState('online');

  const onlineMethods = [
    'Банковской картой',
    'PayPal',
    'Visa QIWI Wallet',
  ];

  const getPaymentMethod = () => {
    if (selectedMethod === 'online') return 'Онлайн';
    return 'Наличными';
  };

  const getOnlineMethod = () => {
    return 'Банковской картой';
  };

  return (
    <div className="pay-payment">
      <PayPersonalHeader title="Способ оплаты" />
      
      <div className="pay-payment__options">
        <div className="pay-payment__main-online">
          <label 
            className={`pay-payment__option ${selectedMethod === 'online' ? 'pay-payment__option--selected' : ''}`}
          >
            <input
              type="radio"
              name="payment"
              value="online"
              checked={selectedMethod === 'online'}
              onChange={() => setSelectedMethod('online')}
              className="pay-payment__radio"
            />
            <span className="pay-payment__option-label">Онлайн</span>
          </label>

          <div className="pay-payment__sub-options">
            {onlineMethods.map((subMethod, index) => (
              <span key={index} className="pay-payment__sub-option">
                {subMethod}
              </span>
            ))}
          </div>
        </div>

        <div className="pay-payment__main-cash">
          <label 
            className={`pay-payment__option ${selectedMethod === 'cash' ? 'pay-payment__option--selected' : ''}`}
          >
            <input
              type="radio"
              name="payment"
              value="cash"
              checked={selectedMethod === 'cash'}
              onChange={() => setSelectedMethod('cash')}
              className="pay-payment__radio"
            />
            <span className="pay-payment__option-label">Наличными</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default PayPayment;