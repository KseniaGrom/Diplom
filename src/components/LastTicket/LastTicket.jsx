import React, { useState, useEffect } from 'react';
import { getLast } from '../../api/api';
import './LastTicket.css';
import TicketIcon from '../../Images/ticketIcon.png';
import PriceIcon from '../../Images/rubl.png';

function LastTicket() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLastTickets = async () => {
      try {
        setLoading(true);
        const data = await getLast();
        setTickets(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('❌ Ошибка загрузки последних билетов:', err);
        setError('Не удалось загрузить последние билеты');
      } finally {
        setLoading(false);
      }
    };

    fetchLastTickets();
  }, []);

  const formatPrice = (price) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') || '0';
  };

  const getCityName = (cityObj) => {
    if (!cityObj) return 'Неизвестно';
    if (typeof cityObj === 'string') return cityObj;
    return cityObj.name || 'Неизвестно';
  };

  const getStationName = (stationObj) => {
    return stationObj?.railway_station_name || 'Вокзал';
  };

  if (loading) {
    return (
      <aside className="lastticket">
        <h2 className="lastticket-h2">последние билеты</h2>
        <div className="lastticket-loading">Загрузка...</div>
      </aside>
    );
  }

  if (error) {
    return (
      <aside className="lastticket">
        <h2 className="lastticket-h2">последние билеты</h2>
        <div className="lastticket-error">{error}</div>
      </aside>
    );
  }

  if (tickets.length === 0) {
    return (
      <aside className="lastticket">
        <h2 className="lastticket-h2">последние билеты</h2>
        <div className="lastticket-empty">Нет доступных билетов</div>
      </aside>
    );
  }

  return (
    <aside className="lastticket">
      <h2 className="lastticket-h2">последние билеты</h2>
      
      {tickets.map((ticket, index) => {
        const departure = ticket.departure || ticket.arrival;
        const fromCity = getCityName(departure?.from?.city);
        const toCity = getCityName(departure?.to?.city);
        const fromStation = getStationName(departure?.from);
        const toStation = getStationName(departure?.to);
        const price = ticket.min_price || departure?.min_price || 0;

        return (
          <div key={ticket._id || index} className="lastticket-ticket">
            <div className="lastticket-sity">
              <span className="lastticket-sity-span">{fromCity}</span>
              <span className="lastticket-sity-span">{toCity}</span>
            </div>

            <div className="lastticket-station">
              <span className="lastticket-station-span">{fromStation}</span>
              <span className="lastticket-station-span">{toStation}</span>
            </div>

            <div className="lastticket-icon">
              <img 
                src={TicketIcon} 
                alt="билет" 
                className="lastticket-icon-img" 
              />
              <div className="lastticket-price">
                <p className="lastticket-price-text">
                  от <span className="lastticket-price-span">{formatPrice(price)}</span>
                </p>
                <img 
                  src={PriceIcon} 
                  alt="рубль" 
                  className="lastticket-price-img" 
                />
              </div>
            </div>
          </div>
        );
      })}
    </aside>
  );
}

export default LastTicket;