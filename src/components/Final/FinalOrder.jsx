import React from 'react';
import rubIcon from '../../Images/rubl.png';
import './FinalOrder.css';

function FinalOrder({ orderNumber = '285АА', totalPrice = 7760 }) {
  return (
    <div className="final-order">
      <span className="final-order__number">№Заказа {orderNumber}</span>
      <span className="final-order__price">
        сумма <span className="final-order__price-value">{totalPrice}</span>
        <img src={rubIcon} alt="₽" className="final-order__rub-icon" />
      </span>
    </div>
  );
}

export default FinalOrder;