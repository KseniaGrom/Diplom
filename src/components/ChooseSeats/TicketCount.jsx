import React, { useState, useEffect } from 'react';
import './TicketCount.css';

function TicketCount({ adults = 2, children = 1, childrenWithoutSeat = 0, onSelect }) {

  const [localAdults] = useState(adults);
  const [localChildren] = useState(children);
  const [localWithoutSeat] = useState(childrenWithoutSeat);

  const [isChildrenActive, setIsChildrenActive] = useState(true);
  const [isWithoutSeatActive, setIsWithoutSeatActive] = useState(false);

  useEffect(() => {
    if (onSelect) {
      onSelect({
        adults: localAdults,
        children: isChildrenActive ? localChildren : 0,
        childrenWithoutSeat: isWithoutSeatActive ? localWithoutSeat : 0
      });
    }
  }, [isChildrenActive, isWithoutSeatActive]);

  return (
    <div className="ticket-count">
      <h2 className="ticket-count__title">Количество билетов</h2>
      <div className="ticket-count__wrapper">
        <div className="ticket-count__item ticket-count__item--active ticket-count__item--always">
          <div className="ticket-count-block">
            <div className="ticket-count-text">
              <span className="ticket-count__label">Взрослых – </span>
              <span className="ticket-count__value">{localAdults}</span>
            </div>
          </div>
          <span className="ticket-count__hint">Можно добавить еще 3 пассажиров</span>
        </div>

        <div 
          className={`ticket-count__item ${isChildrenActive ? 'ticket-count__item--active' : ''}`}
          onClick={() => setIsChildrenActive(!isChildrenActive)}
        >
          <div className="ticket-count-block">
            <div className="ticket-count-text">
              <span className="ticket-count__label">Детских – </span>
              <span className="ticket-count__value">{localChildren}</span>
            </div>
          </div>
          <span className="ticket-count__hint">Можно добавить еще 3 детей до 10 лет. Свое место в вагоне, как у взрослых, но дешевле в среднем на 50-65%</span>
        </div>

        <div 
          className={`ticket-count__item ${isWithoutSeatActive ? 'ticket-count__item--active' : ''}`}
          onClick={() => setIsWithoutSeatActive(!isWithoutSeatActive)}
        >
          <div className="ticket-count-block">
            <div className="ticket-count-text">
              <span className="ticket-count__label">Детских «без места» – </span>
              <span className="ticket-count__value">{localWithoutSeat}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketCount; 