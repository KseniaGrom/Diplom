import React, { useState, useEffect } from 'react';
import './PassengerDocument.css';
import CustomSelect from './CustomSelect';

function PassengerDocument({ 
  index, 
  onDataChange,
  docType: initialDocType = 'Паспорт РФ',
  series: initialSeries = '',
  number: initialNumber = ''
}) {
  const [docType, setDocType] = useState(initialDocType);
  const [isFocused, setIsFocused] = useState(false);
  const [seriesValue, setSeriesValue] = useState(initialSeries);
  const [numberValue, setNumberValue] = useState(initialNumber);

  const docOptions = ['Паспорт РФ', 'Свидетельство о рождении'];

  const isBirthCertificate = docType === 'Свидетельство о рождении';

  useEffect(() => {
    if (onDataChange) {
      onDataChange({
        docType: docType,
        series: seriesValue,
        number: numberValue
      });
    }
  }, [docType, seriesValue, numberValue]);

  const handleDocTypeChange = (value) => {
    console.log(`📝 Пассажир ${index}: выбран документ:`, value);
    setDocType(value);
  };

  const handleNumberInput = (e, maxLength, setter, allowLetters = false) => {
    let value = e.target.value;
    
    if (!allowLetters) {
      value = value.replace(/\D/g, '');
    } else {
      value = value.replace(/[^a-zA-Zа-яА-Я0-9]/g, '');
    }
    
    if (value.length <= maxLength) {
      setter(value);
    } else {
      setter(value.slice(0, maxLength));
    }
  };

  const renderUnderlines = (count) => {
    return '_ _ _ _ _ _ _ _ _ _ _ _'.split(' ').slice(0, count).join(' ');
  };

  const showPlaceholder = (value) => {
    return !isFocused && value.length === 0;
  };

  const getDisplayValue = (value) => {
    return value.split('').join(' ');
  };

  const getNumberPlaceholder = () => {
    if (isBirthCertificate) {
      return '12 символов';
    }
    return '';
  };

  const getNumberMaxLength = () => {
    return isBirthCertificate ? 12 : 6;
  };

  return (
    <div className="passenger-document">
      <div className="passenger-document__field">
        <label className="passenger-document__label">Тип документа</label>
        <CustomSelect
          options={docOptions}
          value={docType}
          onChange={handleDocTypeChange}
          className="passenger-document__select-custom"
        />
      </div>

      {!isBirthCertificate && (
        <div className="passenger-document__field">
          <label className="passenger-document__label">Серия</label>
          <div className="passenger-document__input-wrapper">
            <input
              type="text"
              className="passenger-document__input"
              maxLength={7}
              value={getDisplayValue(seriesValue)}
              onChange={(e) => handleNumberInput(e, 4, setSeriesValue, false)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            {showPlaceholder(seriesValue) && (
              <div className="passenger-document__input-content">
                <span className="passenger-document__underlines">
                  {renderUnderlines(4)}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="passenger-document__field">
        <label className="passenger-document__label">Номер</label>
        <div className="passenger-document__input-wrapper">
          <input
            type="text"
            className="passenger-document__input"
            maxLength={isBirthCertificate ? 23 : 11}
            value={getDisplayValue(numberValue)}
            onChange={(e) => handleNumberInput(e, getNumberMaxLength(), setNumberValue, isBirthCertificate)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {showPlaceholder(numberValue) && (
            <div className="passenger-document__input-content">
              <span className="passenger-document__placeholder-text">
                {getNumberPlaceholder()}
              </span>
              <span className="passenger-document__underlines">
                {isBirthCertificate ? renderUnderlines(12) : renderUnderlines(6)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PassengerDocument;