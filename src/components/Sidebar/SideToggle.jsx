import React, { useState } from 'react';
import './SideToggle.css';
import ToggleItem from './ToggleItem';
import KypeIcon from '../../Images/SideToggle/Kype.png';
import PlatcIcon from '../../Images/SideToggle/Platc.png';
import SeatIcon from '../../Images/SideToggle/Seat.png';
import LuxIcon from '../../Images/SideToggle/Lux.png';
import WiFiIcon from '../../Images/SideToggle/Wi-Fi.png';
import ExpressIcon from '../../Images/SideToggle/Express.png';

function SideToggle({ onWagonChange, onServicesChange }) {
  const [filters, setFilters] = useState({
    Купе: false,
    Плацкарт: false,
    Сидячий: false,
    Люкс: false,
    wifi: false,
    express: false
  });

  const handleToggle = (label, value) => {
    const newFilters = { ...filters, [label]: value };
    setFilters(newFilters);
    
    const wagonTypes = ['Купе', 'Плацкарт', 'Сидячий', 'Люкс'];
    if (wagonTypes.includes(label)) {
      if (onWagonChange) onWagonChange(newFilters);
    } else {
      if (onServicesChange) onServicesChange(newFilters);
    }
  };

  return (
    <div className="sidetoggle">
      <ToggleItem 
        icon={KypeIcon} 
        label="Купе" 
        defaultOn={false}
        onToggle={(value) => handleToggle('Купе', value)}
      />
      <ToggleItem 
        icon={PlatcIcon} 
        label="Плацкарт" 
        defaultOn={false}
        onToggle={(value) => handleToggle('Плацкарт', value)}
      />
      <ToggleItem 
        icon={SeatIcon} 
        label="Сидячий" 
        defaultOn={false}
        onToggle={(value) => handleToggle('Сидячий', value)}
      />
      <ToggleItem 
        icon={LuxIcon} 
        label="Люкс" 
        defaultOn={false}
        onToggle={(value) => handleToggle('Люкс', value)}
      />
      <ToggleItem 
        icon={WiFiIcon} 
        label="Wi-Fi" 
        defaultOn={false}
        onToggle={(value) => handleToggle('wifi', value)}
      />
      <ToggleItem 
        icon={ExpressIcon} 
        label="Экспресс" 
        defaultOn={false}
        onToggle={(value) => handleToggle('express', value)}
      />
    </div>
  );
}

export default SideToggle;