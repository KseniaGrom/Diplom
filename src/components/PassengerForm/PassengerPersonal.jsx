import React, { useState } from 'react';
import './PassengerPersonal.css';

function PassengerPersonal({ 
  index, 
  onDataChange,
  surname: initialSurname = '',
  name: initialName = '',
  patronymic: initialPatronymic = '',
  birthDate: initialBirthDate = '',
  gender: initialGender = ''
}) {
  const [gender, setGender] = useState(initialGender || '');
  const [localSurname, setLocalSurname] = useState(initialSurname);
  const [localName, setLocalName] = useState(initialName);
  const [localPatronymic, setLocalPatronymic] = useState(initialPatronymic);
  const [localBirthDate, setLocalBirthDate] = useState(initialBirthDate);

  const handleGenderSelect = (value) => {
    setGender(value);
    onDataChange?.({ 
      surname: localSurname, 
      name: localName, 
      patronymic: localPatronymic, 
      birthDate: localBirthDate, 
      gender: value 
    });
  };

  const handleFieldChange = (field, value) => {
    const setters = {
      surname: setLocalSurname,
      name: setLocalName,
      patronymic: setLocalPatronymic
    };
    setters[field](value);

    onDataChange?.({ 
      surname: field === 'surname' ? value : localSurname,
      name: field === 'name' ? value : localName,
      patronymic: field === 'patronymic' ? value : localPatronymic,
      birthDate: localBirthDate,
      gender: gender
    });
  };

  const handleDateInput = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    let formatted = '';
    
    if (value.length === 0) {
      formatted = '';
    } else if (value.length <= 2) {
      formatted = value;
    } else if (value.length <= 4) {
      formatted = `${value.slice(0, 2)}.${value.slice(2)}`;
    } else if (value.length <= 8) {
      formatted = `${value.slice(0, 2)}.${value.slice(2, 4)}.${value.slice(4)}`;
    } else {
      formatted = `${value.slice(0, 2)}.${value.slice(2, 4)}.${value.slice(4, 8)}`;
    }
    
    setLocalBirthDate(formatted);

    onDataChange?.({ 
      surname: localSurname, 
      name: localName, 
      patronymic: localPatronymic, 
      birthDate: formatted, 
      gender: gender 
    });
    
    e.target.value = formatted;
  };

  return (
    <div className="passenger-personal">
      <div className="passenger-personal-wrapper">
        <div className="passenger-personal__field">
          <label className="passenger-personal__label">Фамилия</label>
          <input 
            type="text" 
            className="passenger-personal__input" 
            placeholder=""
            value={localSurname}
            onChange={(e) => handleFieldChange('surname', e.target.value)}
          />
        </div>

        <div className="passenger-personal__field">
          <label className="passenger-personal__label">Имя</label>
          <input 
            type="text" 
            className="passenger-personal__input" 
            placeholder=""
            value={localName}
            onChange={(e) => handleFieldChange('name', e.target.value)}
          />
        </div>

        <div className="passenger-personal__field">
          <label className="passenger-personal__label">Отчество</label>
          <input 
            type="text" 
            className="passenger-personal__input" 
            placeholder=""
            value={localPatronymic}
            onChange={(e) => handleFieldChange('patronymic', e.target.value)}
          />
        </div>
      </div>

      <div className="passenger-personal__gender">
        <div className="passenger-personal__gender-wrapper">
          <span className="passenger-personal__label">Пол</span>
          <div className="passenger-personal__gender-options">
            <button
              type="button"
              className={`passenger-personal__gender-btn ${gender === 'M' ? 'passenger-personal__gender-btn--active' : ''}`}
              onClick={() => handleGenderSelect('M')}
            >
              М
            </button>
            <button
              type="button"
              className={`passenger-personal__gender-btn ${gender === 'Ж' ? 'passenger-personal__gender-btn--active' : ''}`}
              onClick={() => handleGenderSelect('Ж')}
            >
              Ж
            </button>
          </div>
        </div>

        <div className="passenger-personal__field">
          <label className="passenger-personal__label">Дата рождения</label>
          <input 
            type="text" 
            className="passenger-personal__input" 
            placeholder="ДД.ММ.ГГГГ" 
            maxLength={10}
            value={localBirthDate}
            onChange={handleDateInput}
          />
        </div>
      </div>

      <div className="passenger-personal__checkbox">
        <label className="passenger-personal__checkbox-label">
          <input type="checkbox" className="passenger-personal__checkbox-input" />
          ограниченная подвижность
        </label>
      </div>
    </div>
  );
}

export default PassengerPersonal;