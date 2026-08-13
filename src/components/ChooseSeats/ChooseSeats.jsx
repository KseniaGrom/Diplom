import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ChooseSeats.css';
import TrainInfo from './TrainInfo';
import TicketCount from './TicketCount';
import WagonType from './WagonType';
import SeatMap from './SeatMap';
import platzkartMap from '../../Images/SeatMaps/platzkart-map.png';
import platzkartBottomMap from '../../Images/SeatMaps/platzkart-bottom.png';
import sittingMap from '../../Images/SeatMaps/sitting-map.png';
import luxMap from '../../Images/SeatMaps/lux-map.png';
import KypetMap from '../../Images/SeatMaps/coupe-map.png';
import WagonInfo from './WagonInfo';

function ChooseSeats() {
  const location = useLocation();
  const navigate = useNavigate();
  const { ticket, adults = 2, children = 1, childrenWithoutSeat = 0 } = location.state || {};

  const [selectedType, setSelectedType] = useState('Плацкарт');
  const [selectedWagons, setSelectedWagons] = useState([]);
  const [openWagons, setOpenWagons] = useState([]);
  const [firstWagonId, setFirstWagonId] = useState(null);

  const defaultWagonMap = {
    'Сидячий': '22',
    'Плацкарт': '12',
    'Купе': '07',
    'Люкс': '02'
  };

  // ★ ПРИ СМЕНЕ ТИПА — ОТКРЫВАЕМ НУЖНЫЙ ВАГОН ★
  useEffect(() => {
    if (ticket) {
      const wagons = ticket.wagons?.[selectedType] || [];
      if (wagons.length > 0) {
        const defaultNumber = defaultWagonMap[selectedType];
        let targetWagon = null;
        if (defaultNumber) {
          targetWagon = wagons.find(w => String(w.number) === String(defaultNumber));
        }
        // ★ ЕСЛИ НАШЛИ НУЖНЫЙ ВАГОН — ОТКРЫВАЕМ ЕГО, ИНАЧЕ ПЕРВЫЙ ★
        const firstId = targetWagon ? targetWagon.id : wagons[0].id;
        setFirstWagonId(firstId);
        setSelectedWagons([firstId]);
        setOpenWagons([firstId]);
      }
    }
  }, [ticket, selectedType]);

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

  if (!ticket) {
    return (
      <div className="choose-seats__error">
        <p>Билет не выбран. Вернитесь и выберите билет.</p>
        <button className="choose-seats__error-btn" onClick={() => navigate('/')}>
          На главную
        </button>
      </div>
    );
  }

  const wagonTypes = ['Сидячий', 'Плацкарт', 'Купе', 'Люкс'];
  const currentWagons = ticket.wagons?.[selectedType] || [];

  const typeImages = {
    'Сидячий': sittingMap,
    'Плацкарт': platzkartMap,
    'Купе': KypetMap,
    'Люкс': luxMap,
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

  const getWagonImage = (wagon) => {
    if (!wagon) return null;
    if (wagonImages[wagon.number]) {
      return wagonImages[wagon.number];
    }
    return typeImages[selectedType] || platzkartMap;
  };

  return (
    <div className="choose-seats">
      <h2 className="choose-seats-h2">Выбор мест</h2>
      <div className="choose-seats__left">
        <TrainInfo ticket={ticket} />
        <TicketCount 
          adults={adults} 
          children={children} 
          childrenWithoutSeat={childrenWithoutSeat} 
        />
        <WagonType 
          types={wagonTypes} 
          selected={selectedType} 
          onSelect={setSelectedType} 
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
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleWagonSelect(wagon.id);
                      }
                    }}
                  >
                    {wagon.number}
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
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseSeats;