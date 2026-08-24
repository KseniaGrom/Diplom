import React from 'react';
import './CheckPrice.css';
import rubIcon from '../../Images/rubl.png';

function CheckPrice({ price }) {
  if (!price) return null;

  const total = price?.totalPrice ||
    (price?.adults * price?.adultPrice || 0) +
    (price?.children * price?.childPrice || 0);

  return (
    <div className="check-price">
      <span className="check-price__label">Всего</span>
      <span className="check-price__value">
        {total}
        <img src={rubIcon} alt="₽" className="check-price__rub-icon" />
      </span>
    </div>
  );
}

export default CheckPrice;