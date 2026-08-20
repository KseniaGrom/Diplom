import React from 'react';
import './CheckPayment.css';
import CheckSectionHeader from './CheckSectionHeader';
import CheckButton from './CheckButton';

function CheckPayment({ payment, ticket, price }) {

  const buttonState = {
    ticket: ticket,
    adults: price?.adults || 0,
    children: price?.children || 0,
    childrenWithoutSeat: price?.childrenWithoutSeat || 0,
    adultPrice: price?.adultPrice || 0,
    childPrice: price?.childPrice || 0
  };

  return (
    <div className="check-payment">
      <CheckSectionHeader title="Способ оплаты" />
      
      <div className="check-payment__grid">
        <div className="check-payment__left">
          <span className="check-payment__value">{payment?.method || '—'}</span>
        </div>
        <div className="check-payment__right">
          <CheckButton to="/pay" state={buttonState}>
            Изменить
          </CheckButton>
        </div>
      </div>
    </div>
  );
}

export default CheckPayment;