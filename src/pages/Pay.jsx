import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Pay.css';
import HeaderPages from '../components/HeaderPages/HeaderPages';
import TripDetails from '../components/TripDetails/TripDetails';
import Error from '../components/Error/Error';

function Pay() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || {};

  const { 
    ticket, 
    adults = 2, 
    children = 1, 
    childrenWithoutSeat = 0,
    adultPrice = 2020,
    childPrice = 1010,
    passengerData
  } = state;

  console.log('Pay state:', state);
  console.log('passengerData:', passengerData);

  if (!ticket) {
    return (
      <Error 
        onClose={() => navigate('/passengers')}
        onHome={() => navigate('/passengers')}
      />
    );
  }

  return (
    <div className="pay">
      <HeaderPages currentStep={3} />
      <main className="pay__main">
        <div className="pay__left">
          <TripDetails 
            ticket={ticket}
            adults={adults}
            children={children}
            childrenWithoutSeat={childrenWithoutSeat}
            adultPrice={adultPrice}
            childPrice={childPrice}
          />
        </div>
        <div className="pay__right">
          <h2>Данные пассажиров</h2>
          
          {passengerData && Object.keys(passengerData).length > 0 ? (
            Object.entries(passengerData).map(([index, data]) => (
              <div key={index} className="pay__passenger">
                <p>
                  <strong>Пассажир {index}:</strong> 
                  {data.surname || ''} {data.name || ''} {data.patronymic || ''}
                </p>
                <p>Дата рождения: {data.birthDate || '—'}</p>
                <p>Тип: {data.docType || '—'}</p>
                <hr />
              </div>
            ))
          ) : (
            <p>Нет данных о пассажирах</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Pay;