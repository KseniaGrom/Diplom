import React, { useState, useEffect } from 'react';
import './FindTicket.css';
import TicketCard from './TicketCard';
import Find from '../Find/Find';
import Pagination from '../Pagination/Pagination';
import Error from '../Error/Error';
import Info from '../Info/Info';
import { useNavigate } from 'react-router-dom';

function FindTicket({
  departureDate,
  returnDate,
  tickets = [],
  isLoading = false,
  error = null,
  noTickets = false,
  filters,
  priceRange,
  timeRangeDeparture,
  timeRangeArrival
}) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [ticketsPerPage, setTicketsPerPage] = useState(5);
  const [sortType, setSortType] = useState('времени');

  const getTimeInMinutes = (timeStr) => {
    if (!timeStr) return Infinity;
    const parts = timeStr.split(':');
    if (parts.length === 2) {
      return parseInt(parts[0]) * 60 + parseInt(parts[1]);
    }
    return Infinity;
  };

  const getMinPrice = (ticket) => {
    if (!ticket.seats || ticket.seats.length === 0) return Infinity;
    const prices = ticket.seats.map(seat => {
      const priceStr = String(seat.price).replace(/\s/g, '');
      return parseInt(priceStr);
    });
    const validPrices = prices.filter(p => !isNaN(p));
    if (validPrices.length === 0) return Infinity;
    return Math.min(...validPrices);
  };

  const getDurationInMinutes = (travelTime) => {
    if (!travelTime) return Infinity;
    const parts = travelTime.split(':');
    if (parts.length === 2) {
      return parseInt(parts[0]) * 60 + parseInt(parts[1]);
    }
    return Infinity;
  };

  const sortTickets = (tickets, sortType) => {
    const sorted = [...tickets];

    switch (sortType) {
      case 'времени':
        sorted.sort((a, b) => {
          const timeA = getTimeInMinutes(a.departure?.time);
          const timeB = getTimeInMinutes(b.departure?.time);
          return timeA - timeB;
        });
        break;

      case 'стоимости':
        sorted.sort((a, b) => {
          const priceA = getMinPrice(a);
          const priceB = getMinPrice(b);
          return priceA - priceB;
        });
        break;

      case 'длительности':
        sorted.sort((a, b) => {
          const durationA = getDurationInMinutes(a.travelTime);
          const durationB = getDurationInMinutes(b.travelTime);
          return durationA - durationB;
        });
        break;

      default:
        break;
    }

    return sorted;
  };

  const filteredTickets = tickets;
  const sortedTickets = sortTickets(filteredTickets, sortType);

  const totalPages = Math.ceil(sortedTickets.length / ticketsPerPage);
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = sortedTickets.slice(indexOfFirstTicket, indexOfLastTicket);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handleShowChange = (value) => {
    setTicketsPerPage(Number(value));
    setCurrentPage(1);
  };

  const handleSortChange = (type) => {
    setSortType(type);
    setCurrentPage(1);
  };

  if (error) {
    return (
      <div className="findticket">
        <Find
          count={0}
          showValue={String(ticketsPerPage)}
          onShowChange={handleShowChange}
          sortValue={sortType}
          onSortChange={handleSortChange}
        />
        <Error
          title="Ошибка загрузки билетов"
          message={error}
          onClose={() => window.location.reload()}
          onHome={() => navigate('/')}
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="findticket">
        <Find
          count={0}
          showValue={String(ticketsPerPage)}
          onShowChange={handleShowChange}
          sortValue={sortType}
          onSortChange={handleSortChange}
        />
        <div className="findticket__loading">
          <div className="findticket__skeleton">
            <div className="findticket__skeleton-card"></div>
            <div className="findticket__skeleton-card"></div>
            <div className="findticket__skeleton-card"></div>
            <div className="findticket__skeleton-card"></div>
            <div className="findticket__skeleton-card"></div>
          </div>
        </div>
      </div>
    );
  }

  if (noTickets || sortedTickets.length === 0) {
    return (
      <div className="findticket">
        <Find
          count={0}
          showValue={String(ticketsPerPage)}
          onShowChange={handleShowChange}
          sortValue={sortType}
          onSortChange={handleSortChange}
        />
        <div className="findticket__info">
          <Info
            title="Билетов не найдено"
            message="Попробуйте изменить даты или направление поиска"
            onClose={() => { }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="findticket">
      <Find
        count={sortedTickets.length}
        showValue={String(ticketsPerPage)}
        onShowChange={handleShowChange}
        sortValue={sortType}
        onSortChange={handleSortChange}
      />
      <div className="findticket__list">
        {currentTickets.map((ticket) => {

          return (
            <TicketCard
              key={ticket._id || ticket.id}
              ticket={ticket}
              departureDate={departureDate}
              returnDate={returnDate}
            />
          );
        })}
      </div>
      {totalPages >= 1 && (
        <div className="findticket__pagination">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}

export default FindTicket;