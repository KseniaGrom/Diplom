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

  useEffect(() => {
    if (wagon?.services) {
      setServices({
        bedding: { included: false, active: false, ...wagon.services.bedding },
        conditioner: { included: false, active: false, ...wagon.services.conditioner },
        wifi: { included: false, active: false, ...wagon.services.wifi },
        tea: { included: false, active: false, ...wagon.services.tea }
      });
    }
  }, [wagon]);

  const serviceData = [
    { id: 'conditioner', icon: conditionerIcon, label: 'кондиционер', description: 'кондиционер' },
    { id: 'wifi', icon: wifiIcon, label: 'Wi-Fi', description: 'Wi-Fi' },
    { id: 'bedding', icon: beddingIcon, label: 'белье', description: 'белье' },
    { id: 'tea', icon: teaIcon, label: 'питание', description: 'питание' }
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

  // ★ СИДЯЧИЙ И ЛЮКС — БЕЗ ВЕРХНИХ/НИЖНИХ И ОДНА ЦЕНА ★
  const isSimpleWagon = wagonType === 'Сидячий' || wagonType === 'Люкс';

  return (
    <div className="wagon-info">
      <div className="wagon-info__header">
        <span className="wagon-info__number">{wagon.number}</span>
        <span className="wagon-info__label">вагон</span>
      </div>
      
      <div className="wagon-info__body">
        <div className="wagon-info-place">
          <div className="wagon-info__item">
            <span className="wagon-info__item-label">Места</span>
            <span className="wagon-info__item-value">{wagon.seats}</span>
          </div>
          
          {!isSimpleWagon && (
            <>
              <div className="wagon-info__item">
                <span className="wagon-info__item-text">Верхние</span>
                <span className="wagon-info__item-value">{wagon.top || 0}</span>
              </div>
              <div className="wagon-info__item">
                <span className="wagon-info__item-text">Нижние</span>
                <span className="wagon-info__item-value">{wagon.bottom || 0}</span>
              </div>
            </>
          )}
        </div>
        
        <div className="wagon-info-costs">
          <div className="wagon-info__costs-item">
            <span className="wagon-info__item-label">Стоимость</span>
            
            {isSimpleWagon ? (
              <div className="wagon-info__item-value wagon-info__item-value--price">
                {wagon.price}
                <img src={rubIcon} alt="₽" className="wagon-info__rub-icon" />
              </div>
            ) : (
              <>
                <div className="wagon-info__item-value wagon-info__item-value--price">
                  {wagon.priceTop || wagon.price}
                  <img src={rubIcon} alt="₽" className="wagon-info__rub-icon" />
                </div>
                <div className="wagon-info__item-value wagon-info__item-value--price">
                  {wagon.priceBottom || wagon.price}
                  <img src={rubIcon} alt="₽" className="wagon-info__rub-icon" />
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="wagon-info-service">
          <div className="wagon-info__item">
            <span className="wagon-info__item-label">Обслуживание</span>
            <span className="wagon-info__item-value">{wagon.service || 'ОТК'}</span>
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