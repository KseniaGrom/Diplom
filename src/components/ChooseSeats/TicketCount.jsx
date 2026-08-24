import React, { useState, useEffect } from 'react';
import './TicketCount.css';

function TicketCount({ 
  adults = 2, 
  children = 1, 
  childrenWithoutSeat = 0, 
  onSelect 
}) {
  const [localAdults, setLocalAdults] = useState(adults);
  const [localChildren, setLocalChildren] = useState(children);
  const [localWithoutSeat, setLocalWithoutSeat] = useState(childrenWithoutSeat);

  const [isChildrenActive, setIsChildrenActive] = useState(children > 0);
  const [isWithoutSeatActive, setIsWithoutSeatActive] = useState(childrenWithoutSeat > 0);

  const MAX_PASSENGERS = 5;
  const MAX_CHILDREN = 3;
  const MAX_WITHOUT_SEAT = 3;

  useEffect(() => {
    if (onSelect) {
      onSelect({
        adults: localAdults,
        children: isChildrenActive ? localChildren : 0,
        childrenWithoutSeat: isWithoutSeatActive ? localWithoutSeat : 0
      });
    }
  }, [localAdults, localChildren, localWithoutSeat, isChildrenActive, isWithoutSeatActive, onSelect]);

  const totalPassengers = localAdults + (isChildrenActive ? localChildren : 0) + (isWithoutSeatActive ? localWithoutSeat : 0);

  const incrementAdults = () => {
    if (totalPassengers < MAX_PASSENGERS) {
      setLocalAdults(prev => prev + 1);
    }
  };

  const decrementAdults = () => {
    if (localAdults > 1) {
      setLocalAdults(prev => prev - 1);
    }
  };

  const incrementChildren = () => {
    if (isChildrenActive && localChildren < MAX_CHILDREN && totalPassengers < MAX_PASSENGERS) {
      setLocalChildren(prev => prev + 1);
    }
  };

  const decrementChildren = () => {
    if (localChildren > 0) {
      setLocalChildren(prev => prev - 1);
      if (localChildren === 1) {
        setIsChildrenActive(false);
      }
    }
  };

  const incrementWithoutSeat = () => {
    if (isWithoutSeatActive && localWithoutSeat < MAX_WITHOUT_SEAT && totalPassengers < MAX_PASSENGERS) {
      setLocalWithoutSeat(prev => prev + 1);
    }
  };

  const decrementWithoutSeat = () => {
    if (localWithoutSeat > 0) {
      setLocalWithoutSeat(prev => prev - 1);
      if (localWithoutSeat === 1) {
        setIsWithoutSeatActive(false);
      }
    }
  };

  const toggleChildren = () => {
    if (!isChildrenActive) {
      setIsChildrenActive(true);
      setLocalChildren(1);
    } else {
      setIsChildrenActive(false);
      setLocalChildren(0);
    }
  };

  const toggleWithoutSeat = () => {
    if (!isWithoutSeatActive) {
      setIsWithoutSeatActive(true);
      setLocalWithoutSeat(1);
    } else {
      setIsWithoutSeatActive(false);
      setLocalWithoutSeat(0);
    }
  };

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
            <div className="ticket-count__arrows">
              <button 
                className="ticket-count__arrow ticket-count__arrow--up"
                onClick={incrementAdults}
                disabled={totalPassengers >= MAX_PASSENGERS}
              >
                ▲
              </button>
              <button 
                className="ticket-count__arrow ticket-count__arrow--down"
                onClick={decrementAdults}
                disabled={localAdults <= 1}
              >
                ▼
              </button>
            </div>
          </div>
          <span className="ticket-count__hint">Можно добавить еще {MAX_PASSENGERS - totalPassengers} пассажиров</span>
        </div>

        <div 
          className={`ticket-count__item ${isChildrenActive ? 'ticket-count__item--active' : ''}`}
          onClick={toggleChildren}
        >
          <div className="ticket-count-block">
            <div className="ticket-count-text">
              <span className="ticket-count__label">Детских – </span>
              <span className="ticket-count__value">{isChildrenActive ? localChildren : 0}</span>
            </div>
            {isChildrenActive && (
              <div className="ticket-count__arrows" onClick={(e) => e.stopPropagation()}>
                <button 
                  className="ticket-count__arrow ticket-count__arrow--up"
                  onClick={incrementChildren}
                  disabled={localChildren >= MAX_CHILDREN || totalPassengers >= MAX_PASSENGERS}
                >
                  ▲
                </button>
                <button 
                  className="ticket-count__arrow ticket-count__arrow--down"
                  onClick={decrementChildren}
                  disabled={localChildren <= 0}
                >
                  ▼
                </button>
              </div>
            )}
          </div>
          <span className="ticket-count__hint">Можно добавить еще 3 детей до 10 лет. Свое место в вагоне, как у взрослых, но дешевле в среднем на 50-65%</span>
        </div>
        <div 
          className={`ticket-count__item ${isWithoutSeatActive ? 'ticket-count__item--active' : ''}`}
          onClick={toggleWithoutSeat}
        >
          <div className="ticket-count-block">
            <div className="ticket-count-text">
              <span className="ticket-count__label">Детских «без места» – </span>
              <span className="ticket-count__value">{isWithoutSeatActive ? localWithoutSeat : 0}</span>
            </div>
            {isWithoutSeatActive && (
              <div className="ticket-count__arrows" onClick={(e) => e.stopPropagation()}>
                <button 
                  className="ticket-count__arrow ticket-count__arrow--up"
                  onClick={incrementWithoutSeat}
                  disabled={localWithoutSeat >= MAX_WITHOUT_SEAT || totalPassengers >= MAX_PASSENGERS}
                >
                  ▲
                </button>
                <button 
                  className="ticket-count__arrow ticket-count__arrow--down"
                  onClick={decrementWithoutSeat}
                  disabled={localWithoutSeat <= 0}
                >
                  ▼
                </button>
              </div>
            )}
          </div>
          <span className="ticket-count__hint">Дети до 10 лет. Билет без места.</span>
        </div>
      </div>
    </div>
  );
}

export default TicketCount;