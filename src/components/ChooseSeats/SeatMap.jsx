import React, { useState, useEffect } from 'react';
import './SeatMap.css';
import coupeMap from '../../Images/SeatMaps/coupe-map.png';
import platzkartTopMap from '../../Images/SeatMaps/platzkart-map.png';
import platzkartBottomMap from '../../Images/SeatMaps/platzkart-bottom.png';
import sittingMap from '../../Images/SeatMaps/sitting-map.png';
import luxMap from '../../Images/SeatMaps/lux-map.png';
import rubIcon from '../../Images/rubl.png';

function SeatMap({ 
  wagonType, 
  wagon, 
  wagonImage,
  adults = 0,
  children = 0,
  childrenWithoutSeat = 0,
  adultPrice = 2920,
  childPrice = 1460,
  onSeatsSelected
}) {
  const getDefaultSeats = () => {
    if (wagonType === 'Люкс') return [7, 8];
    if (wagonType === 'Сидячий') return [11, 12, 14];
    if (wagonType === 'Купе') return [17, 18, 19];
    return [17, 18, 19];
  };

  const [selectedSeats, setSelectedSeats] = useState(getDefaultSeats);
  const [totalPrice, setTotalPrice] = useState(0);

  const mapImages = {
    'Купе': coupeMap,
    'Плацкарт': platzkartTopMap,
    'Сидячий': sittingMap,
    'Люкс': luxMap
  };

  const imageSrc = wagonImage || mapImages[wagonType] || coupeMap;

  const getSeatPositions = () => {
    switch(wagonType) {
      case 'Сидячий':
        return {
          11: { top: '44%', left: '41%' },
          12: { top: '30%', left: '41%' },
          14: { top: '30%', left: '46%' },
        };
      case 'Люкс':
        return {
          7: { top: '39%', left: '42%' },
          8: { top: '39%', left: '45%' },
        };
      case 'Купе':
        return {
          17: { top: '52%', left: '55%' },
          18: { top: '30%', left: '55%' },
          19: { top: '52%', left: '61%' },
        };
      case 'Плацкарт':
        return {
          17: { top: '52%', left: '55%' },
          18: { top: '30%', left: '55%' },
          19: { top: '52%', left: '61%' },
        };
      default:
        return {};
    }
  };

  const seatPositions = getSeatPositions();
  const availableSeats = Object.keys(seatPositions).map(Number);

  const getPricePerSeat = () => {
    if (!wagon) return 0;
    if (wagon.priceTop) {
      return parseInt(String(wagon.priceTop).replace(/\s/g, ''));
    }
    if (wagon.price) {
      return parseInt(String(wagon.price).replace(/\s/g, ''));
    }
    return 0;
  };

  const pricePerSeat = getPricePerSeat();

  const toggleSeat = (seatNumber) => {
    setSelectedSeats(prev => {
      const newSeats = prev.includes(seatNumber) 
        ? prev.filter(s => s !== seatNumber) 
        : [...prev, seatNumber];

      if (onSeatsSelected) {
        const seatsWithType = newSeats.map(seat => ({
          number: seat,
          type: 'adult'
        }));
        onSeatsSelected(seatsWithType);
      }
      
      return newSeats;
    });
  };

  const getSeatSize = () => {
    switch(wagonType) {
      case 'Сидячий': return { width: '27px', height: '19px', fontSize: '12px' };
      case 'Люкс': return { width: '27px', height: '60px', fontSize: '14px' };
      default: return { width: '28px', height: '28px', fontSize: '12px' };
    }
  };

  const seatSize = getSeatSize();

  useEffect(() => {
    const selectedCount = selectedSeats.length;
    if (selectedCount === 0) {
      setTotalPrice(0);
      return;
    }

    const adultPriceValue = adultPrice || pricePerSeat;
    const childPriceValue = childPrice || Math.round(adultPriceValue * 0.5);
    const childWithoutSeatPrice = 0;

    const adultCount = adults || 0;
    const childCount = children || 0;
    const childWithoutSeatCount = childrenWithoutSeat || 0;

    let adultSeats = Math.min(adultCount, selectedCount);
    let remaining = selectedCount - adultSeats;
    let childSeats = Math.min(childCount, remaining);
    remaining = remaining - childSeats;
    let withoutSeatSeats = Math.min(childWithoutSeatCount, remaining);
    remaining = remaining - withoutSeatSeats;

    if (remaining > 0) {
      adultSeats += remaining;
    }

    const total = (adultSeats * adultPriceValue) + (childSeats * childPriceValue) + (withoutSeatSeats * childWithoutSeatPrice);
    setTotalPrice(total);
  }, [selectedSeats, adults, children, childrenWithoutSeat, adultPrice, childPrice, pricePerSeat]);

  return (
    <div className="seat-map">
      {wagon?.people && (
        <div className="seat-map__people">
          <span className="seat-map__people-text">
            {wagon.people} человек выбирают места в этом поезде
          </span>
        </div>
      )}

      <div className="seat-map__image-container">
        <div className="seat-map__image-wrapper">
          <img 
            src={imageSrc} 
            alt={`Схема вагона ${wagon?.number || ''}`}
            className="seat-map__image"
          />
          
          {availableSeats.map((seatNumber) => {
            const pos = seatPositions[seatNumber];
            if (!pos) return null;
            const isSelected = selectedSeats.includes(seatNumber);
            return (
              <div
                key={seatNumber}
                className={`seat-map__seat-overlay ${isSelected ? 'seat-map__seat-overlay--selected' : 'seat-map__seat-overlay--empty'}`}
                style={{
                  position: 'absolute',
                  top: pos.top,
                  left: pos.left,
                  transform: 'translate(-50%, -50%)',
                  width: seatSize.width,
                  height: seatSize.height,
                  fontSize: seatSize.fontSize,
                }}
                onClick={() => toggleSeat(seatNumber)}
              >
              </div>
            );
          })}
        </div>

        <div className="seat-map__price">
          <div className="seat-map__price-value">
            <span className="seat-map__price-amount">{totalPrice}</span>
            <img src={rubIcon} alt="₽" className="seat-map__rub-icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeatMap;