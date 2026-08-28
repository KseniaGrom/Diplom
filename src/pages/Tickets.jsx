import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { getRoutes } from '../api/api';
import './Tickets.css';
import HeaderPages from '../components/HeaderPages/HeaderPages';
import Sidebar from '../components/Sidebar/Sidebar';
import LastTicket from '../components/LastTicket/LastTicket';
import FindTicket from '../components/FindTicket/FindTicket';

function Tickets() {
  const location = useLocation();
  const state = location.state || {};

  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noTickets, setNoTickets] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const [searchParams, setSearchParams] = useState(state.params || '');
  const [departureDate, setDepartureDate] = useState(
    state.departureDate ? new Date(state.departureDate) : null
  );
  const [returnDate, setReturnDate] = useState(
    state.returnDate ? new Date(state.returnDate) : null
  );
  const fromCityId = state.fromCityId || null;
  const toCityId = state.toCityId || null;
  const fromCityParam = state.fromCity || '';
  const toCityParam = state.toCity || '';

  const [filters, setFilters] = useState({
    Купе: false,
    Плацкарт: false,
    Сидячий: false,
    Люкс: false,
    wifi: false,
    express: false,
    priceFrom: null,
    priceTo: null,
    startDepartureFrom: null,
    startDepartureTo: null,
    startArrivalFrom: null,
    startArrivalTo: null,
    endDepartureFrom: null,
    endDepartureTo: null,
    endArrivalFrom: null,
    endArrivalTo: null
  });

  const isFirstRender = useRef(true);
  const debounceTimer = useRef(null);

  const formatDuration = (seconds) => {
    if (!seconds) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${String(mins).padStart(2, '0')}`;
  };

  const formatTime = (datetime) => {
    if (!datetime) return '00:00';
    const date = new Date(datetime * 1000);
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  const formatDate = (datetime) => {
    if (!datetime) return '';
    const date = new Date(datetime * 1000);
    return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
  };

  const adaptTickets = (items, fromCityParam, toCityParam) => {
    if (!items || items.length === 0) return [];

    return items.map((item, index) => {
      const realId = item.departure?._id || item.arrival?._id || item._id || item.id;

      const seatTypes = [];
      const priceInfo = item.departure?.price_info || {};

      if (item.have_first_class || priceInfo.first) {
        seatTypes.push({
          type: 'Люкс',
          count: item.available_seats_info?.first || 0,
          price: priceInfo.first?.price || item.min_price || 0
        });
      }
      if (item.have_second_class || priceInfo.second) {
        seatTypes.push({
          type: 'Купе',
          count: item.available_seats_info?.second || 0,
          price: priceInfo.second?.price || item.min_price || 0
        });
      }
      if (item.have_third_class || priceInfo.third) {
        seatTypes.push({
          type: 'Плацкарт',
          count: item.available_seats_info?.third || 0,
          price: priceInfo.third?.price || item.min_price || 0
        });
      }
      if (item.have_fourth_class || priceInfo.fourth) {
        seatTypes.push({
          type: 'Сидячий',
          count: item.available_seats_info?.fourth || 0,
          price: priceInfo.fourth?.price || item.min_price || 0
        });
      }

      if (seatTypes.length === 0) {
        seatTypes.push({ type: 'Сидячий', count: 10, price: item.min_price || 0 });
      }

      const departure = item.departure || {};
      const arrival = item.arrival || {};

      const fromCity = departure.from?.city?.name || fromCityParam || '';
      const toCity = departure.to?.city?.name || toCityParam || '';

      const hasWifi = item.have_wifi || false;
      const hasExpress = item.is_express || false;
      const hasAirConditioning = item.have_air_conditioning || false;
      const hasTea = true;

      const wagons = {};
      const typeMap = {
        'Сидячий': 'Сидячий',
        'Плацкарт': 'Плацкарт',
        'Купе': 'Купе',
        'Люкс': 'Люкс'
      };

      seatTypes.forEach(seat => {
        const wagonType = typeMap[seat.type] || 'Сидячий';
        wagons[wagonType] = [
          {
            id: `${realId}-${index}`,
            number: String(index + 1),
            seats: seat.count || 10,
            price: seat.price || item.min_price || 0,
            services: {
              wifi: hasWifi,
              express: hasExpress,
              tea: hasTea,
              conditioner: hasAirConditioning
            }
          }
        ];
      });

      return {
        _id: realId,
        id: realId,
        number: departure.train?.name || `Поезд ${index + 1}`,
        route: [fromCity, toCity],
        departure: {
          time: formatTime(departure.from?.datetime),
          city: fromCity,
          station: departure.from?.railway_station_name || '',
          date: formatDate(departure.from?.datetime)
        },
        arrival: {
          time: formatTime(departure.to?.datetime),
          city: toCity,
          station: departure.to?.railway_station_name || '',
          date: formatDate(departure.to?.datetime)
        },
        travelTime: formatDuration(departure.duration || 0),

        return: {
          departure: {
            time: formatTime(arrival.from?.datetime),
            city: arrival.from?.city?.name || '',
            station: arrival.from?.railway_station_name || '',
            date: formatDate(arrival.from?.datetime)
          },
          arrival: {
            time: formatTime(arrival.to?.datetime),
            city: arrival.to?.city?.name || '',
            station: arrival.to?.railway_station_name || '',
            date: formatDate(arrival.to?.datetime)
          },
          travelTime: formatDuration(arrival.duration || 0)
        },

        seats: seatTypes,
        wagons: wagons,
        have_wifi: hasWifi,
        is_express: hasExpress,
        have_air_conditioning: hasAirConditioning
      };
    });
  };

  const fetchTickets = useCallback(async (params) => {
    if (!params) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setNoTickets(false);

      const data = await getRoutes(params);

      if (!data.items || data.items.length === 0) {
        setNoTickets(true);
        setTickets([]);
      } else {
        const adaptedTickets = adaptTickets(data.items, fromCityParam, toCityParam);
        setTickets(adaptedTickets);
        setNoTickets(false);
      }
    } catch (err) {
      setError(err.message);
      console.error('Ошибка загрузки билетов:', err);
    } finally {
      setIsLoading(false);
    }
  }, [fromCityParam, toCityParam]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (searchParams) {
        fetchTickets(searchParams);
      } else {
        setIsLoading(false);
      }
    }
  }, [searchParams, fetchTickets]);

  const applyFilters = useCallback(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      const params = new URLSearchParams();

      if (fromCityId) params.append('from_city_id', fromCityId);
      if (toCityId) params.append('to_city_id', toCityId);
      if (departureDate) {
        params.append('date_start', departureDate);
      }
      if (returnDate) {
        params.append('date_end', returnDate);
      }
      params.append('sort', 'date');
      params.append('limit', '5');
      params.append('offset', '0');

      if (filters.Купе === true) params.append('have_second_class', 'true');
      if (filters.Плацкарт === true) params.append('have_third_class', 'true');
      if (filters.Сидячий === true) params.append('have_fourth_class', 'true');
      if (filters.Люкс === true) params.append('have_first_class', 'true');

      if (filters.wifi === true) params.append('have_wifi', 'true');
      if (filters.express === true) params.append('have_express', 'true');

      if (filters.priceFrom !== null && filters.priceFrom > 0) {
        params.append('price_min', String(filters.priceFrom));
      }
      if (filters.priceTo !== null && filters.priceTo < 10000) {
        params.append('price_max', String(filters.priceTo));
      }

      if (filters.startDepartureFrom !== null && filters.startDepartureFrom > 0) {
        params.append('start_departure_hour_from', String(filters.startDepartureFrom));
      }
      if (filters.startDepartureTo !== null && filters.startDepartureTo < 24) {
        params.append('start_departure_hour_to', String(filters.startDepartureTo));
      }
      if (filters.startArrivalFrom !== null && filters.startArrivalFrom > 0) {
        params.append('start_arrival_hour_from', String(filters.startArrivalFrom));
      }
      if (filters.startArrivalTo !== null && filters.startArrivalTo < 24) {
        params.append('start_arrival_hour_to', String(filters.startArrivalTo));
      }
      if (filters.endDepartureFrom !== null && filters.endDepartureFrom > 0) {
        params.append('end_departure_hour_from', String(filters.endDepartureFrom));
      }
      if (filters.endDepartureTo !== null && filters.endDepartureTo < 24) {
        params.append('end_departure_hour_to', String(filters.endDepartureTo));
      }
      if (filters.endArrivalFrom !== null && filters.endArrivalFrom > 0) {
        params.append('end_arrival_hour_from', String(filters.endArrivalFrom));
      }
      if (filters.endArrivalTo !== null && filters.endArrivalTo < 24) {
        params.append('end_arrival_hour_to', String(filters.endArrivalTo));
      }

      const paramsString = params.toString();
      fetchTickets(paramsString);
    }, 500);
  }, [filters, fromCityId, toCityId, departureDate, returnDate, fetchTickets]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handlePriceChange = (min, max) => {
    const newFilters = { ...filters, priceFrom: min, priceTo: max };
    setFilters(newFilters);
  };

  const handleTimeDepartureChange = (from, to) => {
    const newFilters = { ...filters, startDepartureFrom: from, startDepartureTo: to };
    setFilters(newFilters);
  };

  const handleTimeArrivalChange = (from, to) => {
    const newFilters = { ...filters, startArrivalFrom: from, startArrivalTo: to };
    setFilters(newFilters);
  };

  const handleTimeBackDepartureChange = (from, to) => {
    const newFilters = { ...filters, endDepartureFrom: from, endDepartureTo: to };
    setFilters(newFilters);
  };

  const handleTimeBackArrivalChange = (from, to) => {
    const newFilters = { ...filters, endArrivalFrom: from, endArrivalTo: to };
    setFilters(newFilters);
  };

  useEffect(() => {
    if (isFirstRender.current) return;

    applyFilters();

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [filters, applyFilters]);

  return (
    <div className="tickets">
      <HeaderPages currentStep={1} isLoading={isLoading} />
      <main className="tickets__main">
        <div className="tickets__left">
          <Sidebar
            departureDate={departureDate}
            returnDate={returnDate}
            onFilterChange={handleFilterChange}
            onPriceChange={handlePriceChange}
            onTimeDepartureChange={handleTimeDepartureChange}
            onTimeArrivalChange={handleTimeArrivalChange}
            onTimeBackDepartureChange={handleTimeBackDepartureChange}
            onTimeBackArrivalChange={handleTimeBackArrivalChange}
          />
          <LastTicket />
        </div>
        <FindTicket
          departureDate={departureDate}
          returnDate={returnDate}
          tickets={tickets}
          isLoading={isLoading}
          error={error}
          noTickets={noTickets}
          filters={filters}
          priceRange={{ min: filters.priceFrom || 0, max: filters.priceTo || 10000 }}
          timeRangeDeparture={{ min: filters.startDepartureFrom || 0, max: filters.startDepartureTo || 24 }}
          timeRangeArrival={{ min: filters.startArrivalFrom || 0, max: filters.startArrivalTo || 24 }}
        />
      </main>
    </div>
  );
}

export default Tickets;