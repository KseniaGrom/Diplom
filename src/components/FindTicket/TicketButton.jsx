import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TicketButton.css';

function TicketButton({
  ticket,
  adults = 2,
  children = 1,
  childrenWithoutSeat = 0,
  departureDate,
  returnDate
}) {
  const navigate = useNavigate();

  const handleClick = () => {

    const routeId = ticket?._id || ticket?.id;

    if (!routeId) {
      console.error('❌ ID направления не найден');
      alert('Ошибка: не удалось найти ID направления');
      return;
    }

    navigate('/choosingplaces', {
      state: {
        ticket: ticket,
        routeId: routeId,
        adults: adults,
        children: children,
        childrenWithoutSeat: childrenWithoutSeat,
        departureDate: departureDate ? departureDate.toISOString() : null,
        returnDate: returnDate ? returnDate.toISOString() : null,
      }
    });
  };

  return (
    <button className="ticket-button" onClick={handleClick}>
      Выбрать места
    </button>
  );
}

export default TicketButton;