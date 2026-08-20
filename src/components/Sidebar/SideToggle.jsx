import React, { useState } from 'react';
import './SideToggle.css';
import ToggleItem from './ToggleItem';
import KypeIcon from '../../Images/SideToggle/Kype.png';
import PlatcIcon from '../../Images/SideToggle/Platc.png';
import SeatIcon from '../../Images/SideToggle/Seat.png';
import LuxIcon from '../../Images/SideToggle/Lux.png';
import WiFiIcon from '../../Images/SideToggle/Wi-Fi.png';
import ExpressIcon from '../../Images/SideToggle/Express.png';

function SideToggle({ onFilterChange }) {
  const [filters, setFilters] = useState({
    Купе: true,
    Плацкарт: false,
    Сидячий: false,
    Люкс: false,
    'Wi Fi': true,
    Экспресс: false
  });

  const handleToggle = (label, value) => {
    const newFilters = { ...filters, [label]: value };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  return (
    <div className="sidetoggle">
      <ToggleItem 
        icon={KypeIcon} 
        label="Купе" 
        defaultOn={true}
        onToggle={(value) => handleToggle('Купе', value)}
      />
      <ToggleItem 
        icon={PlatcIcon} 
        label="Плацкарт" 
        onToggle={(value) => handleToggle('Плацкарт', value)}
      />
      <ToggleItem 
        icon={SeatIcon} 
        label="Сидячий" 
        onToggle={(value) => handleToggle('Сидячий', value)}
      />
      <ToggleItem 
        icon={LuxIcon} 
        label="Люкс" 
        onToggle={(value) => handleToggle('Люкс', value)}
      />
      <ToggleItem 
        icon={WiFiIcon} 
        label="Wi-Fi" 
        defaultOn={true}
        onToggle={(value) => handleToggle('Wi Fi', value)}
      />
      <ToggleItem 
        icon={ExpressIcon} 
        label="Экспресс" 
        onToggle={(value) => handleToggle('Экспресс', value)}
      />
    </div>
  );
}

export default SideToggle;