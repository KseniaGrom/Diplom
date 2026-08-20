import React, { useState, useEffect } from 'react';
import './FindTicket.css';
import TicketCard from './TicketCard';
import Find from '../Find/Find';
import Pagination from '../Pagination/Pagination';

function FindTicket({ departureDate, returnDate }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [ticketsPerPage, setTicketsPerPage] = useState(5);
  const [sortType, setSortType] = useState('времени');

 const tickets = [
  {
    id: 1,
    number: '116С',
    route: ['Адлер', 'Москва', 'Санкт-Петербург'],
    departure: { time: '00:10', city: 'Москва', station: 'Курский вокзал' },
    arrival: { time: '09:52', city: 'Санкт-Петербург', station: 'Ладожский вокзал' },
    travelTime: '9:42',
    return: { departure: { time: '00:10', city: 'Москва', station: 'Курский вокзал ' }, arrival: { time: '09:52', city: 'Санкт-Петербург', station: 'Ладожский вокзал' }, travelTime: '9:42' },
    seats: [
      { type: 'Сидячий', count: 88, price: '1 920' },
      { type: 'Плацкарт', count: 52, price: '2 530' },
      { type: 'Купе', count: 24, price: '3 820' },
      { type: 'Люкс', count: 15, price: '4 950' }
    ],
    wagons: {
      'Сидячий': [
        { id: 1, number: '20', seats: 11, price: '2 920', service: 'ОТК', people: 11, services: { bedding: { included: false, active: false }, conditioner: { included: false, active: false }, wifi: { included: true, active: true }, tea: { included: false, active: false } } },
        { id: 2, number: '21', seats: 12, price: '3 020', service: 'ФПК', people: 10, services: { bedding: { included: true, active: true }, conditioner: { included: false, active: false }, wifi: { included: false, active: false }, tea: { included: false, active: false } } },
        { id: 3, number: '22', seats: 35, price: '1 920', service: 'ФПК', people: 11, services: { bedding: { included: false, active: false }, conditioner: { included: false, active: false }, wifi: { included: true, active: true }, tea: { included: false, active: false } } },
        { id: 4, number: '25', seats: 35, price: '1 920', service: 'ФПК', people: 9, services: { bedding: { included: false, active: false }, conditioner: { included: false, active: false }, wifi: { included: false, active: false }, tea: { included: true, active: true } } }
      ],
      'Плацкарт': [
        { id: 5, number: '10', seats: 21, priceTop: '2 020', priceBottom: '3 030', service: 'ОТК', top: 10, bottom: 11, people: 13, services: { bedding: { included: true, active: true }, conditioner: { included: false, active: false }, wifi: { included: false, active: false }, tea: { included: false, active: false } } },
        { id: 6, number: '12', seats: 21, priceTop: '2 020', priceBottom: '3 030', service: 'ФПК', top: 10, bottom: 11, people: 13, services: { bedding: { included: true, active: true }, conditioner: { included: false, active: false }, wifi: { included: false, active: false }, tea: { included: false, active: false } } },
        { id: 7, number: '15', seats: 21, priceTop: '2 020', priceBottom: '3 030', service: 'ОТК', top: 10, bottom: 11, people: 12, services: { bedding: { included: false, active: false }, conditioner: { included: true, active: true }, wifi: { included: false, active: false }, tea: { included: false, active: false } } }
      ],
      'Купе': [
        { id: 8, number: '07', seats: 11, priceTop: '2 920', priceBottom: '3 530', service: 'ФПК', top: 3, bottom: 8, people: 11, services: { bedding: { included: false, active: false }, conditioner: { included: false, active: false }, wifi: { included: false, active: false }, tea: { included: true, active: true } } },
        { id: 9, number: '09', seats: 11, priceTop: '4 920', priceBottom: '5 920', service: 'нет', top: 4, bottom: 4, people: 15, services: { bedding: { included: true, active: true }, conditioner: { included: false, active: false }, wifi: { included: true, active: true }, tea: { included: false, active: false } } }
      ],
      'Люкс': [
        { id: 10, number: '02', seats: 8, price: '4 920', service: 'VIP', people: 19, services: { bedding: { included: true, active: true }, conditioner: { included: true, active: true }, wifi: { included: true, active: true }, tea: { included: true, active: true } } },
        { id: 11, number: '05', seats: 8, price: '8 920', service: 'VIP', people: 5, services: { bedding: { included: false, active: false }, conditioner: { included: false, active: false }, wifi: { included: false, active: false }, tea: { included: false, active: false } } }
      ]
    }
  },

  {
    id: 2,
    number: '020У',
    route: ['Москва', 'Санкт-Петербург'],
    name: 'Мегаполис',
    departure: { time: '00:20', city: 'Москва', station: 'Ленинградский вокзал' },
    arrival: { time: '08:59', city: 'Санкт-Петербург', station: 'Московский вокзал' },
    travelTime: '8:39',
    seats: [
      { type: 'Купе', count: 90, price: '3 950' },
      { type: 'Люкс', count: 31, price: '4 950' }
    ],
    wagons: {
      'Купе': [
        { id: 12, number: '26', seats: 8, price: '4 920', service: 'ОТК', top: 4, bottom: 4, people: 15 },
        { id: 13, number: '27', seats: 8, price: '4 920', service: 'ФПК', top: 4, bottom: 4, people: 14 }
      ],
      'Люкс': [
        { id: 14, number: '28', seats: 4, price: '8 920', service: 'VIP', people: 5 }
      ]
    }
  },

  {
    id: 3,
    number: '116C',
    route: ['Нижний Новгород', 'Москва', 'Санкт-Петербург'],
    name: 'Волга',
    departure: { time: '00:41', city: 'Москва', station: 'Ленинградский вокзал' },
    arrival: { time: '09:13', city: 'Санкт-Петербург', station: 'Ладожский вокзал' },
    travelTime: '8:32',
    return: {
      departure: { time: '00:41', city: 'Москва', station: 'Ленинградский вокзал' },
      arrival: { time: '09:13', city: 'Санкт-Петербург', station: 'Ладожский вокзал' },
      travelTime: '8:32'
    },
    seats: [
      { type: 'Плацкарт', count: 52, price: '2 530' },
      { type: 'Купе', count: 24, price: '3 820' },
      { type: 'Люкс', count: 15, price: '4 950' }
    ],
    wagons: {
      'Плацкарт': [
        { id: 15, number: '29', seats: 21, price: '2 920', service: 'ОТК', top: 10, bottom: 11, people: 12 },
        { id: 16, number: '30', seats: 22, price: '2 920', service: 'ФПК', top: 10, bottom: 12, people: 13 }
      ],
      'Купе': [
        { id: 17, number: '31', seats: 8, price: '4 920', service: 'нет', top: 4, bottom: 4, people: 15 }
      ],
      'Люкс': [
        { id: 18, number: '32', seats: 4, price: '8 920', service: 'VIP', people: 5 }
      ]
    }
  },

  {
    id: 4,
    number: '116C',
    route: ['Адлер', 'Москва', 'Санкт-Петербург'],
    departure: { time: '00:10', city: 'Москва', station: 'Курский вокзал' },
    arrival: { time: '09:52', city: 'Санкт-Петербург', station: 'Ладожский вокзал' },
    travelTime: '9:42',
    return: {
      departure: { time: '00:10', city: 'Москва', station: 'Ленинградский вокзал' },
      arrival: { time: '09:52', city: 'Санкт-Петербург', station: 'Ладожский вокзал' },
      travelTime: '8:32'
    },
    seats: [
      { type: 'Сидячий', count: 88, price: '1 920' },
      { type: 'Плацкарт', count: 52, price: '2 530' },
      { type: 'Купе', count: 24, price: '3 820' },
      { type: 'Люкс', count: 15, price: '4 950' }
    ],
    wagons: {
      'Плацкарт': [
        { id: 19, number: '33', seats: 21, price: '2 920', service: 'ОТК', top: 10, bottom: 11, people: 12 }
      ],
      'Купе': [
        { id: 20, number: '34', seats: 8, price: '4 920', service: 'нет', top: 4, bottom: 4, people: 15 }
      ],
      'Люкс': [
        { id: 21, number: '35', seats: 4, price: '8 920', service: 'VIP', people: 5 }
      ]
    }
  },

  {
    id: 5,
    number: '116C',
    route: ['Адлер', 'Москва', 'Санкт-Петербург'],
    departure: { time: '00:10', city: 'Москва', station: 'Курский вокзал' },
    arrival: { time: '09:52', city: 'Санкт-Петербург', station: 'Ладожский вокзал' },
    travelTime: '9:42',
    return: {
      departure: { time: '00:10', city: 'Москва', station: 'Ленинградский вокзал' },
      arrival: { time: '09:52', city: 'Санкт-Петербург', station: 'Ладожский вокзал' },
      travelTime: '8:32'
    },
    seats: [
      { type: 'Сидячий', count: 88, price: '1 920' },
      { type: 'Плацкарт', count: 52, price: '2 530' },
      { type: 'Купе', count: 24, price: '3 820' },
      { type: 'Люкс', count: 15, price: '4 950' }
    ],
    wagons: {
      'Сидячий': [
        { id: 22, number: '36', seats: 11, price: '2 920', service: 'ОТК', people: 11 }
      ],
      'Плацкарт': [
        { id: 23, number: '37', seats: 21, price: '2 920', service: 'ОТК', top: 10, bottom: 11, people: 12 },
        { id: 24, number: '38', seats: 22, price: '2 920', service: 'ФПК', top: 10, bottom: 12, people: 13 }
      ],
      'Купе': [
        { id: 25, number: '39', seats: 8, price: '4 920', service: 'нет', top: 4, bottom: 4, people: 15 }
      ],
      'Люкс': [
        { id: 26, number: '40', seats: 4, price: '8 920', service: 'VIP', people: 5 }
      ]
    }
  }
];
 
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
    
    switch(sortType) {
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

  const sortedTickets = sortTickets(tickets, sortType);

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
        {currentTickets.map((ticket) => (
          <TicketCard 
            key={ticket.id} 
            ticket={ticket}
            departureDate={departureDate}
            returnDate={returnDate}
          />
        ))}
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