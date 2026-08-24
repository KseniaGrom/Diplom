import React, { useState } from 'react';
import './Sidebar.css';
import SideDate from './SideDate';
import SideToggle from './SideToggle';
import SideCost from './SideCost';
import SideThere from './SideThere';
import SideBack from './SideBack';

function Sidebar({ 
  departureDate, 
  returnDate, 
  onFilterChange,
  onPriceChange,
  onTimeDepartureChange,
  onTimeArrivalChange,
  onTimeBackDepartureChange,
  onTimeBackArrivalChange
}) {
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

  const handleWagonChange = (newFilters) => {
    setFilters(newFilters);
    if (onFilterChange) onFilterChange(newFilters);
  };

  const handleServicesChange = (newFilters) => {
    setFilters(newFilters);
    if (onFilterChange) onFilterChange(newFilters);
  };

  const handlePriceChange = (min, max) => {
    const newFilters = { ...filters, priceFrom: min, priceTo: max };
    setFilters(newFilters);
    if (onPriceChange) onPriceChange(min, max);
    if (onFilterChange) onFilterChange(newFilters);
  };

  const handleTimeDepartureChange = (from, to) => {
    const newFilters = { ...filters, startDepartureFrom: from, startDepartureTo: to };
    setFilters(newFilters);
    if (onTimeDepartureChange) onTimeDepartureChange(from, to);
    if (onFilterChange) onFilterChange(newFilters);
  };

  const handleTimeArrivalChange = (from, to) => {
    const newFilters = { ...filters, startArrivalFrom: from, startArrivalTo: to };
    setFilters(newFilters);
    if (onTimeArrivalChange) onTimeArrivalChange(from, to);
    if (onFilterChange) onFilterChange(newFilters);
  };

  const handleTimeBackDepartureChange = (from, to) => {
    const newFilters = { ...filters, endDepartureFrom: from, endDepartureTo: to };
    setFilters(newFilters);
    if (onTimeBackDepartureChange) onTimeBackDepartureChange(from, to);
    if (onFilterChange) onFilterChange(newFilters);
  };

  const handleTimeBackArrivalChange = (from, to) => {
    const newFilters = { ...filters, endArrivalFrom: from, endArrivalTo: to };
    setFilters(newFilters);
    if (onTimeBackArrivalChange) onTimeBackArrivalChange(from, to);
    if (onFilterChange) onFilterChange(newFilters);
  };

  return (
    <aside className="sidebar">
      <SideDate 
        onDateChange={() => {}}
        initialDepartureDate={departureDate}
        initialReturnDate={returnDate}
      />
      <div className="sidebar-row"></div>
      <SideToggle 
        onWagonChange={handleWagonChange} 
        onServicesChange={handleServicesChange} 
      />
      <div className="sidebar-row"></div>
      <SideCost onPriceChange={handlePriceChange} />
      <div className="sidebar-row"></div>
      <SideThere 
        onTimeDepartureChange={handleTimeDepartureChange}
        onTimeArrivalChange={handleTimeArrivalChange}
      />
      <div className="sidebar-row"></div>
      <SideBack 
        onTimeDepartureChange={handleTimeBackDepartureChange}
        onTimeArrivalChange={handleTimeBackArrivalChange}
      />
    </aside>
  );
}

export default Sidebar;