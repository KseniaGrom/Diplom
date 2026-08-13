import React, { useState } from 'react';
import './TicketCount.css';

function TicketCount({ adults = 2, children = 1, childrenWithoutSeat = 0 }) {
  const [activeItem, setActiveItem] = useState(null);

  const items = [
    { id: 'adults', label: 'Взрослых – ', value: adults, hint: 'Можно добавить еще 3 пассажиров' },
    { id: 'children', label: 'Детских – ', value: children, hint: 'Можно добавить еще 3 детей до 10 лет. Свое место в вагоне, как у взрослых, но дешевле в среднем на 50-65%' },
    { id: 'withoutSeat', label: 'Детских «без места» – ', value: childrenWithoutSeat, hint: null }
  ];

  const handleClick = (id) => {
    setActiveItem(activeItem === id ? null : id);
  };

  return (
    <div className="ticket-count">
      <h2 className="ticket-count__title">Количество билетов</h2>
      <div className="ticket-count__wrapper">
        {items.map((item) => (
          <div 
            key={item.id}
            className={`ticket-count__item ${activeItem === item.id ? 'ticket-count__item--active' : ''}`}
            onClick={() => handleClick(item.id)}
          >
            <div className="ticket-count-block">
              <div className="ticket-count-text">
                <span className="ticket-count__label">{item.label}</span>
                <span className="ticket-count__value">{item.value}</span>
              </div>
            </div>
            {item.hint && <span className="ticket-count__hint">{item.hint}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TicketCount;