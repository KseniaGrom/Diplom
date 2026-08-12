import React from 'react';
import './Sidebar.css';
import SideDate from './SideDate';
import SideToggle from './SideToggle';
import SideCost from './SideCost';
import SideThere from './SideThere';
import SideBack from './SideBack';

function Sidebar() {
  return (
    <aside className="sidebar">
        <SideDate />
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