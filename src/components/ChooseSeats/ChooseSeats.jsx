import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ChooseSeats.css';
import TrainInfo from './TrainInfo';
import TicketCount from './TicketCount';
import WagonType from './WagonType';
import SeatMap from './SeatMap';
import TicketEnd from '../TicketEnd/TicketEnd';
import WagonInfo from './WagonInfo';
import Error from '../Error/Error';
import Info from '../Info/Info';
import { getSeats } from '../../api/api';

import platzkartMap from '../../Images/SeatMaps/platzkart-map.png';
import platzkartBottomMap from '../../Images/SeatMaps/platzkart-bottom.png';
import sittingMap from '../../Images/SeatMaps/sitting-map.png';
import luxMap from '../../Images/SeatMaps/lux-map.png';
import KypetMap from '../../Images/SeatMaps/coupe-map.png';

const getWagonNumbers = (type) => {
  const numbers = {
    'Купе': [7],
    'Плацкарт': [10, 12, 15],
    'Сидячий': [20, 21, 22, 25],
    'Люкс': [2, 5]
  };
  return numbers[type] || [];
};

const wagonImages = {
  '07': KypetMap,
  '09': KypetMap,
  '10': platzkartBottomMap,
  '12': platzkartMap,
  '15': platzkartMap,
  '20': sittingMap,
  '21': sittingMap,
  '22': sittingMap,
  '25': sittingMap,
  '02': luxMap,
  '05': luxMap,
};

const typeImages = {
  'Сидячий': sittingMap,
  'Плацкарт': platzkartMap,
  'Купе': KypetMap,
  'Люкс': luxMap,
};

function ChooseSeats({
  ticket: propTicket,
  adults: initialAdults = 2,
  children: initialChildren = 1,
  childrenWithoutSeat: initialChildrenWithoutSeat = 0,
  onPriceChange
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state || {};

  const locationRouteId = state.routeId;
  const locationTicket = state.ticket || propTicket;

  const routeId = locationRouteId || locationTicket?.id || locationTicket?._id;

  const [wagons, setWagons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedType, setSelectedType] = useState('Сидячий');
  const [selectedWagons, setSelectedWagons] = useState([]);
  const [openWagons, setOpenWagons] = useState([]);
  const [firstWagonId, setFirstWagonId] = useState(null);
  const [adults, setAdults] = useState(initialAdults);
  const [children, setChildren] = useState(initialChildren);
  const [childrenWithoutSeat, setChildrenWithoutSeat] = useState(initialChildrenWithoutSeat);
  const [adultPrice, setAdultPrice] = useState(0);
  const [childPrice, setChildPrice] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const wagonTypes = ['Сидячий', 'Плацкарт', 'Купе', 'Люкс'];

  // ✅ Оборачиваем onPriceChange в useCallback
  const handlePriceChange = useCallback((price, childPrice) => {
    if (onPriceChange) {
      onPriceChange(price, childPrice);
    }
  }, [onPriceChange]);

  // ✅ Оборачиваем handleTicketCountSelect в useCallback
  const handleTicketCountSelect = useCallback((data) => {
    setAdults(data.adults);
    setChildren(data.children);
    setChildrenWithoutSeat(data.childrenWithoutSeat);
  }, []);

  // ✅ Оборачиваем handleSeatsSelected в useCallback
  const handleSeatsSelected = useCallback((seats) => {
    setSelectedSeats(seats);
  }, []);

  // ✅ Оборачиваем handleWagonTypeSelect в useCallback
  const handleWagonTypeSelect = useCallback((type) => {
    setSelectedType(type);

    const typeWagons = wagons.filter(w => w.type === type);
    if (typeWagons.length > 0) {
      const firstWagon = typeWagons[0];
      const price = firstWagon.price || 0;
      setAdultPrice(price);
      setChildPrice(Math.round(price * 0.5));
      if (onPriceChange) {
        onPriceChange(price, Math.round(price * 0.5));
      }
    }
  }, [wagons, onPriceChange]);

  useEffect(() => {
    if (!routeId) {
      setError('ID направления не найден');
      setLoading(false);
      return;
    }

    const fetchWagons = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getSeats(routeId);

        if (data?.error) {
          if (data.error === 'Направление не найдено') {
            throw new Error('Направление не найдено. Возможно, билет уже недоступен.');
          }
          throw new Error(data.error);
        }

        if (!data) {
          throw new Error('Нет данных от сервера');
        }

        let wagonsData = [];
        if (Array.isArray(data)) {
          wagonsData = data;
        } else if (data?.items && Array.isArray(data.items)) {
          wagonsData = data.items;
        } else if (data && typeof data === 'object') {
          for (let key in data) {
            if (Array.isArray(data[key])) {
              wagonsData = data[key];
              break;
            }
          }
        }

        if (wagonsData.length === 0) {
          throw new Error('Нет доступных вагонов для этого направления');
        }

        const formattedWagons = formatWagons(wagonsData);

        setWagons(formattedWagons);

        if (formattedWagons.length > 0) {
          const availableTypes = [...new Set(formattedWagons.map(w => w.type))];

          const firstType = availableTypes[0] || 'Сидячий';
          setSelectedType(firstType);

          const firstWagon = formattedWagons.find(w => w.type === firstType);
          if (firstWagon) {
            setFirstWagonId(firstWagon.id);
            setSelectedWagons([firstWagon.id]);
            setOpenWagons([firstWagon.id]);

            const price = firstWagon.price || 0;
            setAdultPrice(price);
            setChildPrice(Math.round(price * 0.5));
            if (onPriceChange) {
              onPriceChange(price, Math.round(price * 0.5));
            }
          }
        }
      } catch (err) {
        setError(err.message || 'Не удалось загрузить схему вагонов');
      } finally {
        setLoading(false);
      }
    };

    fetchWagons();
  }, [routeId]);

  const formatWagons = (data) => {
    const result = [];

    data.forEach((wagon, index) => {
      const coach = wagon.coach || {};
      const classType = coach.class_type || 'unknown';

      const type = getTypeName(classType);

      if (type === 'unknown' || type === undefined) {
        console.warn('Неизвестный тип вагона:', wagon);
        return;
      }

      const numbers = getWagonNumbers(type);
      const wagonNumber = numbers[index] || (index + 1);

      let price = coach.price || 0;
      if (price === 0) {
        price = coach.top_price || coach.bottom_price || 0;
      }

      const formatted = {
        id: coach._id || `wagon-${index}`,
        number: wagonNumber,
        type: type,
        class_type: classType,
        seats: coach.available_seats || 0,
        price: price,
        priceTop: coach.top_price || 0,
        priceBottom: coach.bottom_price || 0,
        top: coach.top_price || 0,
        bottom: coach.bottom_price || 0,
        wifi: coach.have_wifi || false,
        conditioner: coach.have_air_conditioning || false,
        linens: coach.is_linens_included || false,
        service: coach.is_linens_included ? 'Бельё включено' : 'ОТК',
        people: Math.floor(Math.random() * 20) + 1,
        seatsData: wagon.seats || [],
        raw: wagon
      };

      result.push(formatted);
    });

    result.sort((a, b) => a.number - b.number);
    return result;
  };

  const getTypeName = (classType) => {
    const types = {
      'first': 'Люкс',
      'second': 'Купе',
      'third': 'Плацкарт',
      'fourth': 'Сидячий'
    };
    return types[classType] || classType;
  };

  const getWagonImage = (wagon) => {
    if (!wagon) return null;
    const num = String(wagon.number).padStart(2, '0');
    return wagonImages[num] || typeImages[selectedType] || platzkartMap;
  };

  const filteredWagons = wagons.filter(w => w.type === selectedType);

  // ✅ ИСПРАВЛЕННЫЙ useEffect — убраны adultPrice и childPrice из зависимостей
  useEffect(() => {
    const typeWagons = wagons.filter(w => w.type === selectedType);
    if (typeWagons.length > 0) {
      const firstWagon = typeWagons[0];
      setFirstWagonId(firstWagon.id);
      setSelectedWagons([firstWagon.id]);
      setOpenWagons([firstWagon.id]);

      const price = firstWagon.price || 0;
      const newChildPrice = Math.round(price * 0.5);
      
      setAdultPrice(price);
      setChildPrice(newChildPrice);
      handlePriceChange(price, newChildPrice);
    } else {
      setSelectedWagons([]);
      setOpenWagons([]);
      setFirstWagonId(null);
    }
  }, [selectedType, wagons, handlePriceChange]); // ✅ убрали adultPrice и childPrice

  const handleTicketCountChange = (data) => {
    setAdults(data.adults);
    setChildren(data.children);
    setChildrenWithoutSeat(data.childrenWithoutSeat);
  };

  const handleWagonSelect = (wagonId) => {
    if (wagonId === firstWagonId) return;

    setSelectedWagons(prev => {
      if (prev.includes(wagonId)) {
        setOpenWagons(prevOpen => prevOpen.filter(id => id !== wagonId));
        return prev.filter(id => id !== wagonId);
      }
      setOpenWagons(prevOpen => [...prevOpen, wagonId]);
      return [...prev, wagonId];
    });

    const wagon = wagons.find(w => w.id === wagonId);
    if (wagon) {
      const price = wagon.price || 0;
      setAdultPrice(price);
      setChildPrice(Math.round(price * 0.5));
      if (onPriceChange) {
        onPriceChange(price, Math.round(price * 0.5));
      }
    }
  };

  if (error) {
    return (
      <Error
        message={error}
        onRetry={() => window.location.reload()}
        buttonText="Попробовать снова"
      />
    );
  }

  if (loading) {
    return <div className="choose-seats__loading">Загрузка схемы вагонов...</div>;
  }

  if (!locationTicket) {
    return (
      <Error
        message="Билет не выбран"
        onRetry={() => navigate('/tickets')}
        buttonText="← Вернуться к билетам"
      />
    );
  }

  const currentWagons = filteredWagons;

  if (currentWagons.length === 0) {
    return (
      <div className="choose-seats">
        <h2 className="choose-seats-h2">Выбор мест</h2>
        <div className="choose-seats__container">
          <div className="choose-seats__left">
            <TrainInfo ticket={locationTicket} />
            <TicketCount
              adults={adults}
              children={children}
              childrenWithoutSeat={childrenWithoutSeat}
              onSelect={handleTicketCountSelect}
            />
            <WagonType
              types={wagonTypes}
              selected={selectedType}
              onSelect={handleWagonTypeSelect}
            />
            <div className="choose-seats__info-wrapper">
              <Info
                title="Нет доступных вагонов"
                message={`Для типа "${selectedType}" нет доступных вагонов. Выберите другой тип.`}
                onClose={() => {}}
              />
            </div>
          </div>
          <div className="choose-seats__right">
            <TicketEnd
              ticket={locationTicket}
              adults={adults}
              children={children}
              childrenWithoutSeat={childrenWithoutSeat}
              adultPrice={adultPrice}
              childPrice={childPrice}
              wagonTypes={wagonTypes}
              selectedType={selectedType}
              onWagonTypeSelect={handleWagonTypeSelect}
              onTicketCountChange={handleTicketCountChange}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="choose-seats">
      <h2 className="choose-seats-h2">Выбор мест</h2>
      <div className="choose-seats__container">
        <div className="choose-seats__left">
          <TrainInfo ticket={locationTicket} />
          <TicketCount
            adults={adults}
            children={children}
            childrenWithoutSeat={childrenWithoutSeat}
            onSelect={handleTicketCountSelect}
          />
          <WagonType
            types={wagonTypes}
            selected={selectedType}
            onSelect={handleWagonTypeSelect}
          />

          <div className="choose-seats__wagon-block">
            <div className="choose-seats__wagon-block-header">
              <div className="choose-seats__wagon-block-left">
                <span className="choose-seats__wagon-block-title">Вагоны</span>
                <div className="choose-seats__wagon-numbers">
                  {currentWagons.map((wagon) => (
                    <div
                      key={wagon.id}
                      className={`choose-seats__wagon-number-btn ${selectedWagons.includes(wagon.id) ? 'choose-seats__wagon-number-btn--active' : ''}`}
                      onClick={() => handleWagonSelect(wagon.id)}
                    >
                      {String(wagon.number).padStart(2, '0')}
                    </div>
                  ))}
                </div>
              </div>
              <span className="choose-seats__wagon-block-hint">
                Нумерация вагонов начинается с головы поезда
              </span>
            </div>

            <div className="choose-seats__wagons-list">
              {selectedWagons.map((wagonId) => {
                const wagonData = currentWagons.find(w => w.id === wagonId);
                if (!wagonData) return null;
                if (!openWagons.includes(wagonId)) return null;

                return (
                  <div key={wagonId} className="choose-seats__wagon-scheme">
                    <WagonInfo
                      wagon={wagonData}
                      wagonType={selectedType}
                    />
                    <SeatMap
                      key={`seatmap-${wagonData.id}`}
                      wagonType={selectedType}
                      wagon={wagonData}
                      wagonImage={getWagonImage(wagonData)}
                      adults={adults}
                      children={children}
                      childrenWithoutSeat={childrenWithoutSeat}
                      adultPrice={adultPrice}
                      childPrice={childPrice}
                      onSeatsSelected={handleSeatsSelected}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="choose-seats__right">
          <TicketEnd
            ticket={locationTicket}
            adults={adults}
            children={children}
            childrenWithoutSeat={childrenWithoutSeat}
            adultPrice={adultPrice}
            childPrice={childPrice}
            wagonTypes={wagonTypes}
            selectedType={selectedType}
            onWagonTypeSelect={handleWagonTypeSelect}
            onTicketCountChange={handleTicketCountChange}
          />
        </div>
      </div>
    </div>
  );
}

export default ChooseSeats;