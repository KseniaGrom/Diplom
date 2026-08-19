import React, { useState } from 'react';
import './PassengerInfo.css';
import minusIcon from '../../Images/SideThere/plus-act.png';
import plusIcon from '../../Images/SideThere/pluse.png';
import passengerIcon from '../../Images/passenger.png';
import rubIcon from '../../Images/rubl.png';

function PassengerInfo({ 
  adults = 0, 
  children = 0, 
  childrenWithoutSeat = 0,
  adultPrice = 0,
  childPrice = 0
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const totalAdultsPrice = adults * adultPrice;
  const totalChildrenPrice = children * childPrice;
  const totalPrice = totalAdultsPrice + totalChildrenPrice;
  const totalPassengers = adults + children + childrenWithoutSeat;

  if (totalPassengers === 0) {
    return (
      <div className="passenger-info">
        <div className="passenger-info__header" onClick={toggleExpand}>
          <div className="passenger-info__title-group">
            <img src={passengerIcon} alt="Пассажиры" className="passenger-info__icon" />
            <span className="passenger-info__title">Пассажиры</span>
            <span className="passenger-info__total-count">(0)</span>
          </div>
          <div className="passenger-info__toggle">
            <img src={isExpanded ? minusIcon : plusIcon} alt="toggle" className="passenger-info__toggle-icon" />
          </div>
        </div>
        {isExpanded && (
          <div className="passenger-info__body">
            <div className="passenger-info__empty">Нет выбранных пассажиров</div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="passenger-info">
      <div className="passenger-info__header" onClick={toggleExpand}>
        <div className="passenger-info__title-group">
          <img src={passengerIcon} alt="Пассажиры" className="passenger-info__icon" />
          <span className="passenger-info__title">Пассажиры</span>
        </div>
        <div className="passenger-info__toggle">
          <img src={isExpanded ? minusIcon : plusIcon} alt="toggle" className="passenger-info__toggle-icon" />
        </div>
      </div>

      {isExpanded && (
        <div className="passenger-info__body">
          {adults > 0 && (
            <div className="passenger-info__item">
              <div className="passenger-info__item-left">
                <span className="passenger-info__item-label">Взрослых</span>
                <span className="passenger-info__item-count">{adults}</span>
              </div>
              <div className="passenger-info__item-right">
                <span className="passenger-info__item-price">
                  {totalAdultsPrice} <img src={rubIcon} alt="₽" className="passenger-info__rub-icon" />
                </span>
              </div>
            </div>
          )}

          {children > 0 && (
            <div className="passenger-info__item">
              <div className="passenger-info__item-left">
                <span className="passenger-info__item-label">Детских</span>
                <span className="passenger-info__item-count">{children}</span>
              </div>
              <div className="passenger-info__item-right">
                <span className="passenger-info__item-price">
                  {totalChildrenPrice} <img src={rubIcon} alt="₽" className="passenger-info__rub-icon" />
                </span>
              </div>
            </div>
          )}

          {childrenWithoutSeat > 0 && (
            <div className="passenger-info__item">
              <div className="passenger-info__item-left">
                <span className="passenger-info__item-label">Детских без места</span>
                <span className="passenger-info__item-count">{childrenWithoutSeat}</span>
              </div>
              <div className="passenger-info__item-right">
                <span className="passenger-info__item-price">0 ₽</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PassengerInfo;