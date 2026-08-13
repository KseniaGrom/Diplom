import React from 'react';
import './WagonCard.css';

function WagonCard({ wagon, isSelected, onSelect, wagonType }) {
  return (
    <div 
      className={`wagon-card ${isSelected ? 'wagon-card--active' : ''}`}
      onClick={onSelect}
    >
      <div className="wagon-card__header">
        <span className="wagon-card__number">{wagon.number}</span>
        <span className="wagon-card__label">вагон</span>
      </div>
      
      <div className="wagon-card__body">
        <div className="wagon-card__field">
          <span className="wagon-card__label">Места</span>
          <span className="wagon-card__value">{wagon.seats}</span>
        </div>
        <div className="wagon-card__field">
          <span className="wagon-card__label">Стоимость</span>
          <span className="wagon-card__value wagon-card__value--price">{wagon.price} ₽</span>
        </div>
        <div className="wagon-card__field">
          <span className="wagon-card__label">Обслуживание</span>
          <span className="wagon-card__value">{wagon.service || 'ОТК'}</span>
        </div>
      </div>
      
      <div className="wagon-card__seats">
        <span>Верхние <b>{wagon.top || 0}</b></span>
        <span>Нижние <b>{wagon.bottom || 0}</b></span>
        {wagon.conditioner && <span>кондиционер</span>}
      </div>
      
      <div className="wagon-card__people">
        {wagon.people} человек выбирают места в этом поезде
      </div>
    </div>
  );
}

export default WagonCard;