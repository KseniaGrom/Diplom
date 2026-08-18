import React, { useState } from 'react';
import './PassengerForm.css';
import PassengerHeader from './PassengerHeader';
import PassengerType from './PassengerType';
import PassengerPersonal from './PassengerPersonal';
import PassengerDocument from './PassengerDocument';
import PassengerAddButton from './PassengerAddButton';
import PassengerButton from './PassengerButton';
import PassengerNextButton from './PassengerNextButton';

function PassengerForm({ 
  initialCount = 3, 
  onNext,
  ticket,
  adults = 2,
  children = 1,
  childrenWithoutSeat = 0,
  adultPrice = 2020,
  childPrice = 1010
}) {
  const [expandedPassengers, setExpandedPassengers] = useState([1, 2]);
  const [passengerTypes, setPassengerTypes] = useState({
    1: 'Взрослый',
    2: 'Взрослый',
    3: 'Взрослый'
  });
  const [passengerList, setPassengerList] = useState(
    Array.from({ length: initialCount }, (_, i) => i + 1)
  );

  const [passengerDataMap, setPassengerDataMap] = useState({});

  const togglePassenger = (index) => {
    setExpandedPassengers(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleTypeChange = (index, type) => {
    setPassengerTypes(prev => ({
      ...prev,
      [index]: type
    }));
  };

  const removePassenger = (index) => {
    if (passengerList.length <= 1) return;
    setPassengerList(prev => prev.filter(i => i !== index));
    setExpandedPassengers(prev => prev.filter(i => i !== index));
  };

  const addPassenger = () => {
    const newIndex = passengerList.length > 0 
      ? Math.max(...passengerList) + 1 
      : 1;
    setPassengerList(prev => [...prev, newIndex]);
    setExpandedPassengers(prev => [...prev, newIndex]);
    setPassengerTypes(prev => ({
      ...prev,
      [newIndex]: 'Взрослый'
    }));
  };

  const handlePassengerDataChange = (index, data) => {
    setPassengerDataMap(prev => ({
      ...prev,
      [index]: { ...prev[index], ...data }
    }));
  };

  const getPassengerData = (index) => {
    return passengerDataMap[index] || {};
  };

  const handleNext = () => {
    if (onNext) {
      onNext();
    }
  };

  return (
    <div className="passenger-form">
      {passengerList.map((index) => {
        const isExpanded = expandedPassengers.includes(index);
        const currentData = getPassengerData(index);
        
        return (
          <div key={index} className="passenger-form__item">
            <PassengerHeader
              index={index}
              isExpanded={isExpanded}
              onToggle={() => togglePassenger(index)}
              onRemove={() => removePassenger(index)}
              showRemove={passengerList.length > 1}
            />

            {isExpanded && (
              <div className="passenger-form__body">
                <PassengerType
                  value={passengerTypes[index] || 'Взрослый'}
                  onChange={(type) => handleTypeChange(index, type)}
                />
                <PassengerPersonal 
                  index={index}
                  onDataChange={(data) => handlePassengerDataChange(index, data)}
                  surname={currentData.surname || ''}
                  name={currentData.name || ''}
                  patronymic={currentData.patronymic || ''}
                  birthDate={currentData.birthDate || ''}
                  gender={currentData.gender || 'Ж'}
                />
              </div>
            )}
            
            {isExpanded && (
              <div className="passenger-form__footer">
                <PassengerDocument 
                  index={index}
                  onDataChange={(data) => handlePassengerDataChange(index, data)}
                  docType={currentData.docType || 'Паспорт РФ'}
                  series={currentData.series || ''}
                  number={currentData.number || ''}
                />
              </div>
            )}

            {isExpanded && (
              <div className="passenger-form__next-wrapper">
                <PassengerButton 
                  onClick={() => {
                    const currentIdx = passengerList.indexOf(index);
                    const nextIdx = passengerList[currentIdx + 1];
                    if (nextIdx) {
                      togglePassenger(nextIdx);
                      const nextElement = document.getElementById(`passenger-${nextIdx}`);
                      if (nextElement) {
                        nextElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }
                  }}
                  passengerData={{
                    surname: currentData.surname || '',
                    name: currentData.name || '',
                    patronymic: currentData.patronymic || '',
                    birthDate: currentData.birthDate || '',
                    docType: passengerTypes[index] || 'Взрослый',
                    series: currentData.series || '',
                    number: currentData.number || ''
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
      
      <div className="passenger-form__bottom">
        <PassengerAddButton onClick={addPassenger} />
        <div className="passenger-form__butn">
          <PassengerNextButton 
            onClick={handleNext}
            passengerData={passengerDataMap}
            ticket={ticket}
            adults={adults}
            children={children}
            childrenWithoutSeat={childrenWithoutSeat}
            adultPrice={adultPrice}
            childPrice={childPrice}
          />
        </div>
      </div>
    </div>
  );
}

export default PassengerForm;