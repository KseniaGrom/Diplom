import React from 'react';
import './PriceSummary.css';

function PriceSummary({ seatCount, pricePerSeat, services, wagonType, totalPrice }) {
  const serviceConfig = {
    'Сидячий': { bedding: false, conditioner: false, wifi: false },
    'Плацкарт': { bedding: true, conditioner: false, wifi: false },
    'Купе': { bedding: true, conditioner: false, wifi: false },
    'Люкс': { bedding: true, conditioner: true, wifi: true }
  };

  const config = serviceConfig[wagonType] || {};

  return (
    <div className="price-summary">
      <h3 className="price-summary__title">Итого</h3>

      <div className="price-summary__items">
        <div className="price-summary__item">
          <span>Билеты ({seatCount} шт.)</span>
          <span>{seatCount * pricePerSeat} ₽</span>
        </div>

        {services.bedding && !config.bedding && (
          <div className="price-summary__item">
            <span>Бельё</span>
            <span>+{200 * seatCount} ₽</span>
          </div>
        )}

        {services.conditioner && !config.conditioner && (
          <div className="price-summary__item">
            <span>Кондиционер</span>
            <span>+{150 * seatCount} ₽</span>
          </div>
        )}

        {services.wifi && !config.wifi && (
          <div className="price-summary__item">
            <span>Wi-Fi</span>
            <span>+{100 * seatCount} ₽</span>
          </div>
        )}

        <div className="price-summary__total">
          <span>Всего</span>
          <span>{totalPrice} ₽</span>
        </div>
      </div>

      <button className="price-summary__button">
        Перейти к оплате
      </button>
    </div>
  );
}

export default PriceSummary;