import React from 'react';
import './LastTicket.css';
import TicketIcon from '../../Images/ticketIcon.png';
import PriceIcon from '../../Images/rubl.png';

function LastTicket() {
  const tickets = [
    {
      id: 1,
      fromCity: 'Санкт-Петербург',
      toCity: 'Самара',
      fromStation: 'Курский вокзал',
      toStation: 'Московский вокзал',
      price: '2 500'
    },
    {
      id: 2,
      fromCity: 'Москва',
      toCity: 'Казань',
      fromStation: 'Курский вокзал',
      toStation: 'Московский вокзал',
      price: '3 500'
    },
    {
      id: 3,
      fromCity: 'Казань',
      toCity: 'Нижний Новгород',
      fromStation: 'Курский вокзал',
      toStation: 'Московский вокзал',
      price: '3 800'
    }
  ];

  return (
    <aside className="lastticket">
      <h2 className="lastticket-h2">последние билеты</h2>
      
      {tickets.map((ticket) => (
        <div key={ticket.id} className="lastticket-ticket">
          <div className="lastticket-sity">
            <span className="lastticket-sity-span">{ticket.fromCity}</span>
            <span className="lastticket-sity-span">{ticket.toCity}</span>
          </div>

          <div className="lastticket-station">
            <span className="lastticket-station-span">{ticket.fromStation}</span>
            <span className="lastticket-station-span">{ticket.toStation}</span>
          </div>

          <div className="lastticket-icon">
            <img 
              src={TicketIcon} 
              alt="билет" 
              className="lastticket-icon-img" 
            />
            <div className="lastticket-price">
              <p className="lastticket-price-text">
                от <span className="lastticket-price-span">{ticket.price}</span>
              </p>
              <img 
                src={PriceIcon} 
                alt="рубль" 
                className="lastticket-price-img" 
              />
            </div>
          </div>
        </div>
      ))}
    </aside>
  );
}

export default LastTicket;