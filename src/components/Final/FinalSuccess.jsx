import React from 'react';
import './FinalSuccess.css';

function FinalSuccess({ passengerName = 'Уважаемый пассажир' }) {
  return (
    <div className="final-success">
      <h2 className="final-success__name">{passengerName}!</h2>
      <div className="final-success__text">
        <p>Ваш заказ успешно оформлен.</p>
        <p>В ближайшее время с вами свяжется наш оператор для подтверждения.</p>
      </div>
      <p className="final-success__thanks">Благодарим Вас за оказанное доверие и желаем приятного путешествия!</p>
    </div>
  );
}

export default FinalSuccess;