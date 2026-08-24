import React, { useState, useEffect } from 'react';
import './WagonInfo.css';
import rubIcon from '../../Images/rubl.png';
import beddingIcon from '../../Images/Services/bedding.png';
import conditionerIcon from '../../Images/Services/conditioner.png';
import wifiIcon from '../../Images/Services/WiFi.png';
import teaIcon from '../../Images/Services/tea.png';

function WagonInfo({ wagon, wagonType }) {
  const [hoveredBtn, setHoveredBtn] = useState(null);

  const [services, setServices] = useState({
    bedding: { included: false, active: false },
    conditioner: { included: false, active: false },
    wifi: { included: false, active: false },
    tea: { included: false, active: false }
  });

  const getActualWagonType = () => {
    if (wagonType && wagonType !== 'Все') return wagonType;

    const raw = wagon?.raw;
    if (raw?.coach?.class_type) {
      const types = {
        'first': 'Люкс',
        'second': 'Купе',
        'third': 'Плацкарт',
        'fourth': 'Сидячий'
      };
      return types[raw.coach.class_type] || 'Неизвестно';
    }

    if (wagon?.type && wagon.type !== 'undefined') {
      return wagon.type;
    }

    return 'Неизвестно';
  };

  const actualWagonType = getActualWagonType();

  useEffect(() => {
    if (wagon) {
      console.log('🔍 WagonInfo получил wagon:', wagon);

      const hasWifi = wagon.wifi || wagon.have_wifi || false;
      const hasConditioner = wagon.conditioner || wagon.have_air_conditioning || false;
      const hasLinens = wagon.linens || wagon.is_linens_included || false;
      const hasTea = wagon.tea || false;

      setServices({
        bedding: { included: hasLinens, active: false },
        conditioner: { included: hasConditioner, active: false },
        wifi: { included: hasWifi, active: false },
        tea: { included: hasTea, active: false }
      });
    }
  }, [wagon]);

  const serviceData = [
    { id: 'conditioner', icon: conditionerIcon, label: 'кондиционер', description: 'Кондиционер' },
    { id: 'wifi', icon: wifiIcon, label: 'Wi-Fi', description: 'Wi-Fi' },
    { id: 'bedding', icon: beddingIcon, label: 'белье', description: 'Бельё' },
    { id: 'tea', icon: teaIcon, label: 'питание', description: 'Питание' }
  ];

  const toggleService = (id) => {
    if (services[id]?.included) return;
    setServices(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        active: !prev[id].active
      }
    }));
  };

  const handleMouseEnter = (id) => {
    if (!services[id]?.included) {
      setHoveredBtn(id);
    }
  };

  const handleMouseLeave = () => {
    setHoveredBtn(null);
  };

  const isSimpleWagon = actualWagonType === 'Сидячий' || actualWagonType === 'Люкс';

  const formatWagonNumber = (num) => {
    if (!num) return '01';
    return String(num).padStart(2, '0');
  };

  if (!wagon) {
    return (
      <div className="wagon-info">
        <div className="wagon-info__empty">Нет данных о вагоне</div>
      </div>
    );
  }

  const wagonNumber = wagon.number || wagon.raw?.coach?.name || 1;

  const seats = wagon.seats || wagon.raw?.coach?.available_seats || 0;

  const price = wagon.price || wagon.raw?.coach?.price || 0;
  const priceTop = wagon.priceTop || wagon.raw?.coach?.top_price || 0;
  const priceBottom = wagon.priceBottom || wagon.raw?.coach?.bottom_price || 0;

  const getTopBottomCount = () => {
    const seatsData = wagon.seatsData || wagon.raw?.seats || [];
    if (!seatsData.length) return { top: 0, bottom: 0 };

    let top = 0;
    let bottom = 0;
    seatsData.forEach(seat => {
      if (seat.index % 2 === 0) {
        bottom += 1;
      } else {
        top += 1;
      }
    });
    return { top, bottom };
  };

  const { top: topCount, bottom: bottomCount } = getTopBottomCount();

  return (
    <div className="wagon-info">
      <div className="wagon-info__header">
        <span className="wagon-info__number">{formatWagonNumber(wagonNumber)}</span>
        <span className="wagon-info__label">вагон</span>
      </div>

      <div className="wagon-info__body">
        <div className="wagon-info-place">
          <div className="wagon-info__item">
            <span className="wagon-info__item-label">Места</span>
            <span className="wagon-info__item-value">{seats}</span>
          </div>

          {!isSimpleWagon && (
            <>
              <div className="wagon-info__item">
                <span className="wagon-info__item-text">Верхние</span>
                <span className="wagon-info__item-value wagon-info__item-value--seats">{topCount}</span>
              </div>
              <div className="wagon-info__item">
                <span className="wagon-info__item-text">Нижние</span>
                <span className="wagon-info__item-value wagon-info__item-value--seats">{bottomCount}</span>
              </div>
            </>
          )}
        </div>

        <div className="wagon-info-costs">
          <div className="wagon-info__costs-item">
            <span className="wagon-info__item-label">Стоимость</span>

            {isSimpleWagon ? (
              <div className="wagon-info__item-value wagon-info__item-value--price">
                {price}
                <img src={rubIcon} alt="₽" className="wagon-info__rub-icon" />
              </div>
            ) : (
              <>
                <div className="wagon-info__item-value wagon-info__item-value--price">
                  {priceTop || price}
                  <img src={rubIcon} alt="₽" className="wagon-info__rub-icon" />
                </div>
                <div className="wagon-info__item-value wagon-info__item-value--price">
                  {priceBottom || price}
                  <img src={rubIcon} alt="₽" className="wagon-info__rub-icon" />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="wagon-info-service">
          <div className="wagon-info__item">
            <span className="wagon-info__item-label">Обслуживание</span>
            <span className="wagon-info__item-value wagon-info__item-value--service">ФПК</span>
          </div>

          <div className="wagon-info__buttons">
            {serviceData.map((service) => {
              const isIncluded = services[service.id]?.included || false;
              const isActive = services[service.id]?.active || false;

              return (
                <div
                  key={service.id}
                  className="wagon-info__btn-wrapper"
                  onMouseEnter={() => handleMouseEnter(service.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={`wagon-info__btn 
                      ${isIncluded ? 'wagon-info__btn--included' : ''} 
                      ${isActive && !isIncluded ? 'wagon-info__btn--active' : ''}
                    `}
                    onClick={() => toggleService(service.id)}
                    disabled={isIncluded}
                  >
                    <img
                      src={service.icon}
                      alt={service.label}
                      className="wagon-info__btn-icon"
                    />
                  </button>
                  {hoveredBtn === service.id && !isIncluded && (
                    <span className="wagon-info__tooltip">
                      {service.description}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WagonInfo;