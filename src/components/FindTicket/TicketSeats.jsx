import React from 'react';
import './TicketSeats.css';
import TicketSeat from './TicketSeat';
import TicketButton from './TicketButton';
import WiFiIcon from '../../Images/SideToggle/Wi-Fi.png';
import ExpressIcon from '../../Images/SideToggle/Express.png';
import TeaIcon from '../../Images/SideToggle/eat.png';

function TicketSeats({ 
  seats, 
  ticket,
  adults = 2,
  children = 1,
  childrenWithoutSeat = 0,
  departureDate,
  returnDate
}) {
  const getSeatDetails = (seatType) => {
    if (!ticket?.wagons) return { top: undefined, bottom: undefined, topPrice: undefined, bottomPrice: undefined };
    
    const wagonType = seatType;
    const wagons = ticket.wagons[wagonType];
    
    if (!wagons || wagons.length === 0) {
      return { top: undefined, bottom: undefined, topPrice: undefined, bottomPrice: undefined };
    }

    let totalTop = 0;
    let totalBottom = 0;
    let topPrice = null;
    let bottomPrice = null;
    
    wagons.forEach(wagon => {
      if (wagon.top !== undefined) {
        totalTop += wagon.top;
        if (topPrice === null && wagon.priceTop) {
          topPrice = wagon.priceTop;
        }
      }
      if (wagon.bottom !== undefined) {
        totalBottom += wagon.bottom;
        if (bottomPrice === null && wagon.priceBottom) {
          bottomPrice = wagon.priceBottom;
        }
      }
    });
    
    return {
      top: totalTop > 0 ? totalTop : undefined,
      bottom: totalBottom > 0 ? totalBottom : undefined,
      topPrice: topPrice,
      bottomPrice: bottomPrice
    };
  };

  const getServiceIcons = (wagon) => {
    if (!wagon?.services) return [];
    
    const icons = [];
    const services = wagon.services;

    if (services.wifi) icons.push(WiFiIcon);
    if (services.tea) icons.push(TeaIcon);
    if (services.express) icons.push(ExpressIcon);
    
    return icons;
  };

  return (
    <div className="ticket-seats">
      <div className="ticket-seats__list">
        {seats.map((seat, index) => {
          const details = getSeatDetails(seat.type);
          return (
            <TicketSeat 
              key={index} 
              seat={seat}
              top={details.top}
              bottom={details.bottom}
              topPrice={details.topPrice}
              bottomPrice={details.bottomPrice}
            />
          );
        })}
      </div>
      <div className="ticket-seats__action">
        <div className="ticket-seats__services">
          {ticket?.wagons && Object.values(ticket.wagons)[0]?.[0] && 
            getServiceIcons(Object.values(ticket.wagons)[0][0]).map((icon, idx) => (
              <img 
                key={idx}
                src={icon} 
                alt="услуга" 
                className="ticket-seats__service-icon" 
              />
            ))
          }
        </div>
        <TicketButton 
          ticket={ticket}
          adults={adults}
          children={children}
          childrenWithoutSeat={childrenWithoutSeat}
          departureDate={departureDate}
          returnDate={returnDate}
        />
      </div>
    </div>
  );
}

export default TicketSeats;