import React from 'react';
import './TripDetails.css';
import TripDetailsHead from './TripDetailsHead';
import TicketInfoThere from './TicketInfoThere';
import TicketInfBack from './TicketInfBack';
import PassengerInfo from './PassengerInfo';
import TotalPrice from './TotalPrice';

function TripDetails({ 
  ticket, 
  adults = 2, 
  children = 1, 
  childrenWithoutSeat = 0,
  adultPrice = 2020,
  childPrice = 1010
}) {

    const totalPrice = (adults * adultPrice) + (children * childPrice);

  return (
    <aside className="tripdetails">
      <TripDetailsHead />
      <div className="tripdetails-row"></div>
      <TicketInfoThere ticket={ticket} />
      <div className="tripdetails-row"></div>
      <TicketInfBack ticket={ticket} />
      <div className="tripdetails-row"></div>
      <PassengerInfo 
        adults={adults}
        children={children}
        childrenWithoutSeat={childrenWithoutSeat}
        adultPrice={adultPrice}
        childPrice={childPrice}
      />
      <div className="tripdetails-row"></div>
      <TotalPrice totalPrice={totalPrice} />
    </aside>
  );
}

export default TripDetails;