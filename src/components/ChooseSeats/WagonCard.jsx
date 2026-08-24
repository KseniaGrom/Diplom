import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ChooseSeats.css';
import TrainInfo from './TrainInfo';
import TicketCount from './TicketCount';
import WagonType from './WagonType';
import SeatMap from './SeatMap';
import TicketEnd from '../TicketEnd/TicketEnd';
import WagonInfo from './WagonInfo';
import Error from '../Error/Error';
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

function ChooseSeats() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { ticket: locationTicket, routeId: locationRouteId } = location.state || {};
  
  const [ticket, setTicket] = useState(locationTicket);
  const [wagons, setWagons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [selectedType, setSelectedType] = useState('Плацкарт');
  const [selectedWagons, setSelectedWagons] = useState([]);
  const [openWagons, setOpenWagons] = useState([]);
  const [firstWagonId, setFirstWagonId] = useState(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);
  const [childrenWithoutSeat, setChildrenWithoutSeat] = useState(0);
  const [adultPrice, setAdultPrice] = useState(0);
  const [childPrice, setChildPrice] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const wagonTypes = ['Сидячий', 'Плацкарт', 'Купе', 'Люкс'];

  const routeId = locationRouteId || ticket?._id;

  useEffect(() => {

    if (!routeId) {
      setError('ID направления не найден');
      setLoading(false);
      return;
    }

    const fetchWagons = async () => {
      try {
        setLoading(true);
        const data = await getSeats(routeId);

        if (data?.error) {
          throw new Error(data.error);
        }

        let wagonsData = [];
        if (Array.isArray(data)) {
          wagonsData = data;
        } else if (data && typeof data === 'object') {
          for (let key in data) {
            if (Array.isArray(data[key])) {
              wagonsData = data[key];
              break;
            }
          }
        }
        
        if (wagonsData.length === 0) {
          setError('Нет доступных вагонов');
          setLoading(false);
          return;
        }

        const formattedWagons = formatWagons(wagonsData);

        setWagons(formattedWagons);

        if (formattedWagons.length > 0) {
          const firstWagon = formattedWagons[0];
          setFirstWagonId(firstWagon.id);
          setSelectedWagons([firstWagon.id]);
          setOpenWagons([firstWagon.id]);
          setAdultPrice(firstWagon.price || 0);
          setChildPrice(Math.round((firstWagon.price || 0) * 0.5));
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
      const type = getTypeName(wagon.class_type);
      const numbers = getWagonNumbers(type);
      const wagonNumber = numbers[index] || (index + 1);
      
      result.push({
        id: wagon._id || `wagon-${index}`,
        number: wagonNumber,
        type: type,
        class_type: wagon.class_type,
        seats: wagon.avaliable_seats || 0,
        price: wagon.price || 0,
        priceTop: wagon.top_price || 0,
        priceBottom: wagon.bottom_price || 0,
        top: wagon.top_price || 0,
        bottom: wagon.bottom_price || 0,
        wifi: wagon.have_wifi || false,
        conditioner: wagon.have_air_conditioning || false,
        linens: wagon.is_linens_included || false,
        service: wagon.is_linens_included ? 'Бельё включено' : 'ОТК',
        people: Math.floor(Math.random() * 20) + 1,
        seatsData: wagon.seats || [],
        raw: wagon
      });
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

  useEffect(() => {
    const typeWagons = wagons.filter(w => w.type === selectedType);
    if (typeWagons.length > 0) {
      const firstWagon = typeWagons[0];
      setFirstWagonId(firstWagon.id);
      setSelectedWagons([firstWagon.id]);
      setOpenWagons([firstWagon.id]);
      setAdultPrice(firstWagon.price || 0);
      setChildPrice(Math.round((firstWagon.price || 0) * 0.5));
    } else {
      setSelectedWagons([]);
      setOpenWagons([]);
      setFirstWagonId(null);
    }
  }, [selectedType, wagons]);

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
  };

  const handleTicketCountSelect = (data) => {
    setAdults(data.adults);
    setChildren(data.children);
    setChildrenWithoutSeat(data.childrenWithoutSeat);
  };

  const handleSeatsSelected = (seats) => {
    setSelectedSeats(seats);
  };

  const handleWagonTypeSelect = (type) => {
    setSelectedType(type);
  };

  if (error) {
    return (
      <Error 
        message={error}
        onRetry={() => navigate('/tickets')}
        buttonText="← Вернуться к билетам"
      />
    );
  }

  if (loading) {
    return <div className="choose-seats__loading">Загрузка схемы вагонов...</div>;
  }

  const currentWagons = filteredWagons;

  if (currentWagons.length === 0) {
    return (
      <Error 
        message="Нет доступных вагонов для выбранного типа"
        onRetry={() => navigate('/tickets')}
        buttonText="← Вернуться к билетам"
      />
    );
  }

  return (
    <div className="choose-seats">
      <h2 className="choose-seats-h2">Выбор мест</h2>
      <div className="choose-seats__container">
        <div className="choose-seats__left">
          {ticket && <TrainInfo ticket={ticket} />}
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
            ticket={ticket}
            adults={adults}
            children={children}
            childrenWithoutSeat={childrenWithoutSeat}
            adultPrice={adultPrice}
            childPrice={childPrice}
            wagonTypes={wagonTypes}
            selectedType={selectedType}
            onWagonTypeSelect={handleWagonTypeSelect}
          />
        </div>
      </div>
    </div>
  );
}

export default ChooseSeats;