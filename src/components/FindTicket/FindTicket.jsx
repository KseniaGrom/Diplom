import React, { useState } from 'react';
import './FindTicket.css';
import TicketCard from './TicketCard';
import Find from '../Find/Find';
import Pagination from '../Pagination/Pagination';

function FindTicket() {
  const [currentPage, setCurrentPage] = useState(1);
  const [ticketsPerPage, setTicketsPerPage] = useState(5); // ← по умолчанию 5
  const tickets = [
    {
      id: 1,
      number: '116С',
      route: ['Адлер', 'Москва', 'Санкт-Петербург'],
      departure: {
        time: '00:10',
        city: 'Москва',
        station: 'Курский вокзал'
      },
      arrival: {
        time: '09:52',
        city: 'Санкт-Петербург',
        station: 'Ладожский вокзал'
      },
      travelTime: '9:42',
      return: {
        departure: {
          time: '00:10',
          city: 'Москва',
          station: 'Курский вокзал '
        },
        arrival: {
          time: '09:52',
          city: 'Санкт-Петербург',
          station: 'Ладожский вокзал'
        },
        travelTime: '9:42'
      },
      seats: [
        { type: 'Сидячий', count: 88, price: '1 920' },
        { type: 'Плацкарт', count: 52, price: '2 530' },
        { type: 'Купе', count: 24, price: '3 820' },
        { type: 'Люкс', count: 15, price: '4 950' }
      ]
    },

    {
      id: 2,
      number: '020У',
      route: ['Москва', 'Санкт-Петербург'],
      name: 'Мегаполис',
      departure: {
        time: '00:20',
        city: 'Москва',
        station: 'Ленинградский вокзал'
      },
      arrival: {
        time: '08:59',
        city: 'Санкт-Петербург',
        station: 'Московский вокзал'
      },
      travelTime: '8:39',
      seats: [
        { type: 'Купе', count: 90, price: '3 950' },
        { type: 'Люкс', count: 31, price: '4 950' }
      ]
    },

    {
      id: 3,
      number: '116C',
      route: ['Нижний Новгород','Москва', 'Санкт-Петербург'],
      name: 'Волга',
      departure: {
        time: '00:41',
        city: 'Москва',
        station: 'Ленинградский вокзал'
      },
      arrival: {
        time: '09:13',
        city: 'Санкт-Петербург',
        station: 'Ладожский вокзал'
      },
      travelTime: '8:32',
      return: {
      departure: {
        time: '00:41',
        city: 'Москва',
        station: 'Ленинградский вокзал'
      },
      arrival: {
        time: '09:13',
        city: 'Санкт-Петербург',
        station: 'Ладожский вокзал'
      },
        travelTime: '8:32'
      },
      seats: [
        { type: 'Плацкарт', count: 52, price: '2 530' },
        { type: 'Купе', count: 24, price: '3 820' },
        { type: 'Люкс', count: 15, price: '4 950' }
      ]
    },

    {
      id: 4,
      number: '116C',
      route: ['Адлер', 'Москва','Санкт-Петербург'],
      departure: {
        time: '00:10',
        city: 'Москва',
        station: 'Курский вокзал'
      },
      arrival: {
        time: '09:52',
        city: 'Санкт-Петербург',
        station: 'Ладожский вокзал'
      },
      travelTime: '9:42',
      return: {
      departure: {
        time: '00:10',
        city: 'Москва',
        station: 'Ленинградский вокзал'
      },
      arrival: {
        time: '09:52',
        city: 'Санкт-Петербург',
        station: 'Ладожский вокзал'
      },
        travelTime: '8:32'
      },
      seats: [
        { type: 'Сидячий', count: 88, price: '1 920' },
        { type: 'Плацкарт', count: 52, price: '2 530' },
        { type: 'Купе', count: 24, price: '3 820' },
        { type: 'Люкс', count: 15, price: '4 950' }
      ]
    },

    {
      id: 5,
      number: '116C',
      route: ['Адлер', 'Москва','Санкт-Петербург'],
      departure: {
        time: '00:10',
        city: 'Москва',
        station: 'Курский вокзал'
      },
      arrival: {
        time: '09:52',
        city: 'Санкт-Петербург',
        station: 'Ладожский вокзал'
      },
      travelTime: '9:42',
      return: {
      departure: {
        time: '00:10',
        city: 'Москва',
        station: 'Ленинградский вокзал'
      },
      arrival: {
        time: '09:52',
        city: 'Санкт-Петербург',
        station: 'Ладожский вокзал'
      },
        travelTime: '8:32'
      },
      seats: [
        { type: 'Сидячий', count: 88, price: '1 920' },
        { type: 'Плацкарт', count: 52, price: '2 530' },
        { type: 'Купе', count: 24, price: '3 820' },
        { type: 'Люкс', count: 15, price: '4 950' }
      ]
    },

  ];

 // ★ ВЫЧИСЛЯЕМ РЕАЛЬНОЕ КОЛИЧЕСТВО СТРАНИЦ ★
  const totalPages = Math.ceil(tickets.length / ticketsPerPage);

  // ★ ПОЛУЧАЕМ БИЛЕТЫ ДЛЯ ТЕКУЩЕЙ СТРАНИЦЫ ★
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);

  // ★ ЕСЛИ ТЕКУЩАЯ СТРАНИЦА БОЛЬШЕ ОБЩЕГО КОЛИЧЕСТВА — СБРАСЫВАЕМ ★
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(totalPages);
  }

  // ★ ОБРАБОТЧИК ИЗМЕНЕНИЯ "ПОКАЗЫВАТЬ ПО" ★
  const handleShowChange = (value) => {
    setTicketsPerPage(Number(value));
    setCurrentPage(1); // ← сбрасываем на первую страницу
  };

  return (
    <div className="findticket">
      <Find 
        count={tickets.length} 
        showValue={String(ticketsPerPage)}
        onShowChange={handleShowChange}
      />
      <div className="findticket__list">
        {currentTickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      {totalPages >= 1 && (
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={setCurrentPage} 
        />
      )}
            </div>
    </div>
  );
}

export default FindTicket;