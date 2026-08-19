import React from 'react';
import './CheckPassengers.css';
import CheckSectionHeader from './CheckSectionHeader';
import CheckPrice from './CheckPrice';
import PassengerBig from '../../Images/PasangerBig.png';
import CheckButton from './CheckButton';

function CheckPassengers({ passengers, price }) {
  if (!passengers || passengers.length === 0) {
    return (
      <div className="check-passengers__empty">
        <p>Нет данных о пассажирах</p>
      </div>
    );
  }

  const isPassengerFilled = (passenger) => {
    return passenger.surname?.trim() !== '' || 
           passenger.name?.trim() !== '' || 
           passenger.patronymic?.trim() !== '';
  };

  const filledPassengers = passengers.filter(isPassengerFilled);

  if (filledPassengers.length === 0) {
    return (
      <div className="check-passengers__empty">
        <p>Нет заполненных данных о пассажирах</p>
      </div>
    );
  }

  const getGenderShort = (gender) => {
    if (gender === 'M') return 'Мужской';
    if (gender === 'Ж') return 'Женский';
    return '—';
  };

  const getDocType = (docType) => {
    if (!docType) return '—';
    if (docType === 'Паспорт РФ') return 'Паспорт РФ';
    if (docType === 'Свидетельство о рождении') return 'Свидетельство о рождении';
    return docType;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return dateStr;
  };

  return (
    <div className="check-passengers">
      <CheckSectionHeader title="Пассажиры" />
      
      <div className="check-passengers__grid">

        <div className="check-passengers__left">
          {filledPassengers.map((passenger, index) => (
            <div key={index} className="check-passengers__item">
              <div className="check-passengers__item-body">
                <div className="check-passengers__item-avatar-wrapper">
                  <div className="check-passengers__item-avatar">
                    <img 
                      src={PassengerBig} 
                      alt="Пассажир" 
                      className="check-passengers__avatar-img"
                    />
                  </div>
                  <span className={`check-passengers__item-type check-passengers__item-type--${passenger.type === 'Детский' ? 'child' : 'adult'}`}>
                    {passenger.type || 'Взрослый'}
                  </span>
                </div>
                
                <div className="check-passengers__item-info">
                  <div className="check-passengers__row">
                    <span className="check-passengers__value check-passengers__value--name">
                      {passenger.surname || ''} {passenger.name || ''} {passenger.patronymic || ''}
                    </span>
                  </div>
                  
                  <div className="check-passengers__row">
                    <span className="check-passengers__label">Пол</span>
                    <span className="check-passengers__value">{getGenderShort(passenger.gender)}</span>
                  </div>
                  
                  <div className="check-passengers__row">
                    <span className="check-passengers__label">Дата рождения</span>
                    <span className="check-passengers__value">{formatDate(passenger.birthDate)}</span>
                  </div>
                  
                  <div className="check-passengers__row">
                    <span className="check-passengers__label">Документ</span>
                    <span className="check-passengers__value">
                      {getDocType(passenger.docType)} 
                      {passenger.series && passenger.number && ` ${passenger.series} ${passenger.number}`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="check-passengers__right">
          <div className="check-passengers__right-content">
            <CheckPrice price={price} />
              <div className="check-passengers__right-button">
                <CheckButton>Изменить</CheckButton>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckPassengers;