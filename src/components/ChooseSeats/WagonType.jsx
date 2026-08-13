import React from 'react';
import './WagonType.css';
import sittingIcon from '../../Images/WagonType/Sitting.png';
import platzkartIcon from '../../Images/WagonType/Platckart.png';
import coupeIcon from '../../Images/WagonType/Kype.png';
import luxIcon from '../../Images/WagonType/Luxe.png';

function WagonType({ types, selected, onSelect }) {
  const iconMap = {
    'Сидячий': sittingIcon,
    'Плацкарт': platzkartIcon,
    'Купе': coupeIcon,
    'Люкс': luxIcon
  };

  return (
    <div className="wagon-type">
      <h2 className="wagon-type__title">Тип вагона</h2>
      <div className="wagon-type__list">
        {types.map((type) => (
          <div
            key={type}
            className={`wagon-type__btn ${selected === type ? 'wagon-type__btn--active' : ''}`}
            onClick={() => onSelect(type)}
          >
            <img 
              src={iconMap[type]} 
              alt={type} 
              className="wagon-type__icon" 
            />
            <span className="wagon-type__label">{type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WagonType;