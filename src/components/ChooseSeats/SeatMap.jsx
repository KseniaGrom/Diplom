import React from 'react';
import './SeatMap.css';
import coupeMap from '../../Images/SeatMaps/coupe-map.png';
import platzkartTopMap from '../../Images/SeatMaps/platzkart-map.png';
import platzkartBottomMap from '../../Images/SeatMaps/platzkart-bottom.png';
import sittingMap from '../../Images/SeatMaps/sitting-map.png';
import luxMap from '../../Images/SeatMaps/lux-map.png';

function SeatMap({ wagonType, wagon, wagonImage }) {
  const mapImages = {
    'Купе': coupeMap,
    'Плацкарт': platzkartTopMap,  // ← по умолчанию верхняя
    'Сидячий': sittingMap,
    'Люкс': luxMap
  };

  // ★ ЕСЛИ ПЕРЕДАНА СПЕЦИАЛЬНАЯ КАРТИНКА — ИСПОЛЬЗУЕМ ЕЁ ★
  const imageSrc = wagonImage || mapImages[wagonType] || coupeMap;

  return (
    <div className="seat-map">
      <div className="seat-map__image-container">
        <img 
          src={imageSrc} 
          alt='{`Схема вагона ${wagon?.number}`}'
          className="seat-map__image"
        />
      </div>
    </div>
  );
}

export default SeatMap;