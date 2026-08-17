import React from 'react';
import './HeaderRow.css';

function HeaderRow({ currentStep = 1 }) {
  const steps = [
    { id: 1, label: 'Билеты' },
    { id: 2, label: 'Пассажиры' },
    { id: 3, label: 'Оплата' },
    { id: 4, label: 'Проверка' }
  ];

  const getWidth = () => {
    if (currentStep >= 4) return '100%';
    if (currentStep >= 3) return '1255px';
    if (currentStep >= 2) return '896px';
    return '540px';
  };

  return (
    <div className="headerrow-row">
      <div 
        className="header-row__background" 
        style={{ width: getWidth() }}
      ></div>

      <div className="header-row__content">
        {steps.map((step, index) => (
          <div key={step.id} className="header-row__item-wrapper">
            <div 
              className={`header-row__item ${currentStep >= step.id ? 'header-row__item--active' : ''}`}
            >
              <div className="header-row__number-wrapper">
                <span className="header-row__number">{step.id}</span>
              </div>
              <span className="header-row__label">{step.label}</span>
            </div>
            
            {index < steps.length - 1 && (
              <div className={`header-row__corner ${currentStep >= step.id ? 'header-row__corner--active' : ''}`}>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeaderRow;