import React from 'react';
import './TicketEnd.css';
import TicketEndButton from './TicketEndButton';
import arrowIcon from '../../Images/BtninfoRight.png';
import TrainInfoRow from '../ChooseSeats/TrainInfoRow';
import TicketCount from '../ChooseSeats/TicketCount';
import WagonType from '../ChooseSeats/WagonType';
import TicketEndButn from './TicketEndButn';

function TicketEnd({ 
  ticket, 
  adults = 2, 
  children = 1, 
  childrenWithoutSeat = 0,
  adultPrice = 2020,
  childPrice = 1010,
  wagonTypes = ['Сидячий', 'Плацкарт', 'Купе', 'Люкс'],
  selectedType = 'Плацкарт',
  onWagonTypeSelect = () => {}
}) {
  if (!ticket) {
    return <div>Загрузка данных о поезде...</div>;
  }

  return (
    <div className="ticketend">
      <div className="ticketend__change-container">
        <div className="ticketend__change-button">
          <img src={arrowIcon} alt="←" className="ticketend-btn__icon" />
          <TicketEndButton />
        </div>
        <TrainInfoRow ticket={ticket} />
        <TicketCount 
          adults={adults} 
          children={children} 
          childrenWithoutSeat={childrenWithoutSeat} 
        />
        <WagonType 
          types={wagonTypes} 
          selected={selectedType} 
          onSelect={onWagonTypeSelect} 
        />
      </div>
      <div className="ticketend-btn">
        <TicketEndButn 
          ticket={ticket}
          adults={adults}
          children={children}
          childrenWithoutSeat={childrenWithoutSeat}
          adultPrice={adultPrice}
          childPrice={childPrice}
        />
      </div>
    </div>
  );
}

export default TicketEnd;