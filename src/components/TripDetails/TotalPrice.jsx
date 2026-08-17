import React from 'react';
import './TotalPrice.css';
import rubIcon from '../../Images/publWhite.png';

function TotalPrice({ totalPrice }) {
  return (
    <div className="total-price">
      <span className="total-price__label">Итог</span>
      <div className="total-price__value">
        <span className="total-price__amount">{totalPrice}</span>
        <img src={rubIcon} alt="₽" className="total-price__rub-icon" />
      </div>
    </div>
  );
}

export default TotalPrice;