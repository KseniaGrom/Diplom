import React from 'react';
import './CheckPayment.css';

function CheckPayment({ payment }) {
  return (
    <div className="check-payment">
      <div className="check-payment__row">
        <span className="check-payment__label">Способ:</span>
        <span className="check-payment__value">{payment?.method || '—'}</span>
      </div>
      
      {payment?.onlineMethod && (
        <div className="check-payment__row">
          <span className="check-payment__label">Детали:</span>
          <span className="check-payment__value">{payment.onlineMethod}</span>
        </div>
      )}
    </div>
  );
}

export default CheckPayment;