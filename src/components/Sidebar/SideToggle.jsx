import React from 'react';
import './SideToggle.css';
import ToggleItem from './ToggleItem';
import KypeIcon from '../../Images/SideToggle/Kype.png';
import PlatcIcon from '../../Images/SideToggle/Platc.png';
import SeatIcon from '../../Images/SideToggle/Seat.png';
import LuxIcon from '../../Images/SideToggle/Lux.png';
import WiFiIcon from '../../Images/SideToggle/Wi-Fi.png';
import ExpressIcon from '../../Images/SideToggle/Express.png';

function SideToggle() {
  return (
    <div className="sidetoggle">
        <ToggleItem icon={KypeIcon} label="Купе"  defaultOn={true} />
        <ToggleItem icon={PlatcIcon} label="Плацкарт" />
        <ToggleItem icon={SeatIcon} label="Сидячий" />
        <ToggleItem icon={LuxIcon} label="Люкс" />
        <ToggleItem icon={WiFiIcon} label="Wi-Fi" defaultOn={true}/>
        <ToggleItem icon={ExpressIcon} label="Экспресс" />
    </div>
  );
}

export default SideToggle;