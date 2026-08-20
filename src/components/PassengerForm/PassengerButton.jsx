import React, { useState } from 'react';
import './PassengerButton.css';
import doneIcon from '../../Images/done.png';
import errorIcon from '../../Images/error.png';

function PassengerButton({ onClick, passengerDataMap, currentIndex }) {
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [showError, setShowError] = useState(false);

  const validateBirthCertificate = (number) => {
    if (!number) return false;
    const cleanNumber = number.replace(/\s/g, '');
    const pattern = /^[IVX]{1,4}[А-Я]{2}\d{6}$/;
    return pattern.test(cleanNumber);
  };

  const validatePassport = (series, number) => {
    const seriesPattern = /^\d{4}$/;
    const numberPattern = /^\d{6}$/;
    return seriesPattern.test(series) && numberPattern.test(number);
  };

  const handleClick = () => {
    const data = passengerDataMap?.[currentIndex];
    
    if (!data) {
      setError('Данные пассажира не найдены');
      setShowError(true);
      return;
    }

    if (data.docType === 'Паспорт РФ') {
      const series = data.series || '';
      const number = data.number || '';
      
      if (!series.trim() || !number.trim()) {
        setError('Заполните серию и номер паспорта');
        setIsValid(false);
        setIsChecked(true);
        setShowError(true);
        return;
      }

      if (!validatePassport(series, number)) {
        setError('Серия должна содержать 4 цифры, номер — 6 цифр');
        setIsValid(false);
        setIsChecked(true);
        setShowError(true);
        return;
      }
    }

    if (data.docType === 'Свидетельство о рождении') {
      const number = data.number || '';
      
      if (!number.trim()) {
        setError('Заполните номер свидетельства о рождении');
        setIsValid(false);
        setIsChecked(true);
        setShowError(true);
        return;
      }

      if (!validateBirthCertificate(number)) {
        setError('Номер свидетельства о рождении указан некорректно Пример: VIII-ЫП-123456');
        setIsValid(false);
        setIsChecked(true);
        setShowError(true);
        return;
      }
    }

    setError('');
    setIsValid(true);
    setIsChecked(true);
    setShowError(false);
  };

  const handleCloseError = () => {
    setShowError(false);
    setError('');
    setIsValid(false);
    setIsChecked(false);
  };

  const handleSuccessClick = () => {
    setIsValid(false);
    setIsChecked(false);
    setShowError(false);
    setError('');
    if (onClick) {
      onClick();
    }
  };

  const data = passengerDataMap?.[currentIndex];
  const hasBirthCertificate = data?.docType === 'Свидетельство о рождении';
  const hasPassport = data?.docType === 'Паспорт РФ';

  const formatErrorMessage = (message) => {
    const parts = message.split('Пример:');
    if (parts.length === 2) {
      return (
        <>
          {parts[0]}Пример: <strong>{parts[1].trim()}</strong>
        </>
      );
    }
    return message;
  };

  if (!data) {
    return (
      <div className="passenger-button-wrapper">
        <button className="passenger-next-button" onClick={onClick}>
          Следующий пассажир
        </button>
      </div>
    );
  }

  if (showError && error) {
    return (
      <div className="passenger-button-wrapper passenger-button-wrapper--error">
        <div className="passenger-button-error-row">
          <img 
            src={errorIcon} 
            alt="Закрыть" 
            className="passenger-button-error-close"
            onClick={handleCloseError}
          />
          <span className="passenger-button-error">
            {formatErrorMessage(error)}
          </span>
        </div>
      </div>
    );
  }

  if (isValid && isChecked) {
    return (
      <div className="passenger-button-wrapper passenger-button-wrapper--success">
        <div className="passenger-button-success">
          <img src={doneIcon} alt="Готово" className="passenger-button-success-icon" />
          <span className="passenger-button-success-text">Готово</span>
        </div>
        <button className="passenger-next-button" onClick={handleSuccessClick}>
          Следующий пассажир
        </button>
      </div>
    );
  }

  return (
    <div className="passenger-button-wrapper">
      <button className="passenger-next-button" onClick={handleClick}>
        Следующий пассажир
      </button>
    </div>
  );
}

export default PassengerButton;