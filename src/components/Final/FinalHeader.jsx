import React from 'react';
import Logo from '../Header/Logo';
import TopNav from '../Header/TopNav';
import './FinalHeader.css';

function FinalHeader() {

  return (
    <header className="final-header">
      <div className="final-header-logo"> 
        <Logo />
      </div> 
      <TopNav />
    </header>
  );
}

export default FinalHeader;