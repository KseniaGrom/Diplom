import React, { useState } from 'react';
import './Sidebar.css';
import SideDate from './SideDate';
import SideToggle from './SideToggle';
import SideCost from './SideCost';
import SideThere from './SideThere';
import SideBack from './SideBack';

function Sidebar({ departureDate: propDepartureDate, returnDate: propReturnDate }) {
  const [departureDate, setDepartureDate] = useState(propDepartureDate || null);
  const [returnDate, setReturnDate] = useState(propReturnDate || null);

  const handleDateChange = (dateData) => {
    setDepartureDate(dateData.departureDate);
    setReturnDate(dateData.returnDate);
  };

  return (
    <aside className="sidebar">
        <SideDate 
          onDateChange={handleDateChange}
          initialDepartureDate={departureDate}
          initialReturnDate={returnDate}
        />
        <div className="sidebar-row"></div>
        <SideToggle />
        <div className="sidebar-row"></div>
        <SideCost />
        <div className="sidebar-row"></div>
        <SideThere />
        <div className="sidebar-row"></div>
        <SideBack />
    </aside>
  );
}

export default Sidebar;