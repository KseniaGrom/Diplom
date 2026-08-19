import React, { useState, useEffect } from 'react';
import PayPersonalHeader from './PayPersonalHeader';
import Error from '../Error/Error';
import './PayPersonal.css';

function PayPersonal({ passengerData, adults = 0, children = 0 }) {
  const [passengers, setPassengers] = useState({});
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (passengerData && Object.keys(passengerData).length > 0) {
      setPassengers(passengerData);
    } else {
      setShowError(true);
    }
  }, [passengerData]);

  const getFirstPassenger = () => {
    const entries = Object.entries(passengers);
    if (entries.length === 0) return null;
    
    const [index, data] = entries[0];
    return { index, data };
  };

  const getPassengerType = (data) => {
    if (data.docType === 'Свидетельство о рождении') {
      return 'Детский';
    }
    return 'Взрослый';
  };

  const handleFieldChange = (index, field, value) => {
    setPassengers(prev => ({
      ...prev,
      [index]: {
        ...prev[index],
        [field]: value
      }
    }));
  };

  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length === 0) return '';
    
    let formatted = '+7';
    if (digits.length > 1) {
      formatted += ` (${digits.slice(1, 4)}`;
    } else if (digits.length === 1) {
      formatted += ` (${digits.slice(1)}`;
    }
    
    if (digits.length >= 4) {
      formatted += `) ${digits.slice(4, 7)}`;
    } else if (digits.length > 1 && digits.length < 4) {
      formatted += `) ${digits.slice(1)}`;
    }
    
    if (digits.length >= 7) {
      formatted += `-${digits.slice(7, 9)}`;
    }
    
    if (digits.length >= 9) {
      formatted += `-${digits.slice(9, 11)}`;
    }
    
    return formatted;
  };

  const handlePhoneChange = (index, value) => {
    if (value === '') {
      handleFieldChange(index, 'phone', '');
      return;
    }
    const formatted = formatPhone(value);
    handleFieldChange(index, 'phone', formatted);
  };

  if (showError) {
    return (
      <Error 
        onClose={() => setShowError(false)}
        onHome={() => window.location.href = '/'}
      />
    );
  }

  const firstPassenger = getFirstPassenger();

  if (!firstPassenger) {
    return (
      <Error 
        onClose={() => setShowError(false)}
        onHome={() => window.location.href = '/'}
      />
    );
  }

  const { index, data } = firstPassenger;
  const passengerType = getPassengerType(data);

  return (
    <div className="pay-personal">
      <PayPersonalHeader title="Персональные данные" />
      
      <div className="pay-personal__list">
        <div className="pay-personal__item">
          
          <div className="pay-personal__item-body">
            <div className="pay-personal__field-group">
              <div className="pay-personal__field">
                <label className="pay-personal__label">Фамилия</label>
                <input
                  type="text"
                  className="pay-personal__input"
                  value={data.surname || ''}
                  onChange={(e) => handleFieldChange(index, 'surname', e.target.value)}
                />
              </div>
              
              <div className="pay-personal__field">
                <label className="pay-personal__label">Имя</label>
                <input
                  type="text"
                  className="pay-personal__input"
                  value={data.name || ''}
                  onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                />
              </div>
              
              <div className="pay-personal__field">
                <label className="pay-personal__label">Отчество</label>
                <input
                  type="text"
                  className="pay-personal__input"
                  value={data.patronymic || ''}
                  onChange={(e) => handleFieldChange(index, 'patronymic', e.target.value)}
                />
              </div>
            </div>

            <div className="pay-personal__field-group pay-personal__field-group--contacts">
              <div className="pay-personal__field pay-personal__field--phone">
                <label className="pay-personal__label">Контактный телефон</label>
                <input
                  type="tel"
                  className="pay-personal__input"
                  value={data.phone || ''}
                  onChange={(e) => handlePhoneChange(index, e.target.value)}
                  placeholder="+7 (___) ___-__-__"
                  maxLength={18}
                />
              </div>
              
              <div className="pay-personal__field pay-personal__field--email">
                <label className="pay-personal__label">E-mail</label>
                <input
                  type="email"
                  className="pay-personal__input"
                  value={data.email || ''}
                  onChange={(e) => handleFieldChange(index, 'email', e.target.value)}
                  placeholder="example@mail.ru"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PayPersonal;