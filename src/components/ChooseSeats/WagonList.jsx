import React from 'react';
import './WagonList.css';
import WagonCard from './WagonCard';

function WagonList({ wagons, selectedWagon, onSelectWagon, wagonType }) {
  if (wagons.length === 0) {
    return <div className="wagon-list__empty">Нет вагонов этого типа</div>;
  }

  return (
    <div className="wagon-list">
      <div className="wagon-list__header">
        <span>Вагоны</span>
        <span>Нумерация вагонов начинается с головы поезда</span>
      </div>
      <div className="wagon-list__grid">
        {wagons.map((wagon) => (
          <WagonCard
            key={wagon.id}
            wagon={wagon}
            isSelected={selectedWagon === wagon.id}
            onSelect={() => onSelectWagon(wagon.id)}
            wagonType={wagonType}
          />
        ))}
      </div>
    </div>
  );
}

export default WagonList;