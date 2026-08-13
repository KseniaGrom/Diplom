import React from 'react';
import './Services.css';
import beddingIcon from '../../Images/Services/bedding.png';
import conditionerIcon from '../../Images/Services/conditioner.png';
import wifiIcon from '../../Images/Services/WiFi.png';
import teaIcon from '../../Images/Services/tea.png';

function Services({ wagonType, selectedServices, onServiceChange }) {
  const servicesConfig = {
    'Сидячий': {
      bedding: { label: 'Бельё', included: false, icon: beddingIcon },
      conditioner: { label: 'Кондиционер', included: false, icon: conditionerIcon },
      wifi: { label: 'Wi-Fi', included: false, icon: wifiIcon },
      tea: { label: 'Чай/кофе', included: false, icon: teaIcon }
    },
    'Плацкарт': {
      bedding: { label: 'Бельё', included: true, icon: beddingIcon },
      conditioner: { label: 'Кондиционер', included: false, icon: conditionerIcon },
      wifi: { label: 'Wi-Fi', included: false, icon: wifiIcon },
      tea: { label: 'Чай/кофе', included: false, icon: teaIcon }
    },
    'Купе': {
      bedding: { label: 'Бельё', included: true, icon: beddingIcon },
      conditioner: { label: 'Кондиционер', included: false, icon: conditionerIcon },
      wifi: { label: 'Wi-Fi', included: false, icon: wifiIcon },
      tea: { label: 'Чай/кофе', included: false, icon: teaIcon }
    },
    'Люкс': {
      bedding: { label: 'Бельё', included: true, icon: beddingIcon },
      conditioner: { label: 'Кондиционер', included: true, icon: conditionerIcon },
      wifi: { label: 'Wi-Fi', included: true, icon: wifiIcon },
      tea: { label: 'Чай/кофе', included: true, icon: teaIcon }
    }
  };

  const services = servicesConfig[wagonType] || {};

  return (
    <div className="services">
      <h3 className="services__title">Дополнительные услуги</h3>
      {Object.entries(services).map(([key, service]) => (
        <label key={key} className={`services__item ${service.included ? 'services__item--included' : ''}`}>
          <div className="services__item-left">
            <img 
              src={service.icon} 
              alt={service.label} 
              className="services__icon" 
            />
            <span className="services__label">{service.label}</span>
          </div>
          <div className="services__item-right">
            <input
              type="checkbox"
              checked={selectedServices[key] || service.included}
              onChange={() => !service.included && onServiceChange(key)}
              disabled={service.included}
            />
            {service.included && (
              <span className="services__included">включено</span>
            )}
          </div>
        </label>
      ))}
    </div>
  );
}

export default Services;