import React from 'react';
import Logo from '../Header/Logo';
import TopNav from '../Header/TopNav';
import HeaderForm from './HeaderForm';
import HeaderRow from './HeaderRow';
import './HeaderPages.css';

function HeaderPages({ currentStep = 1, departureDate, returnDate, onDateChange }) {

  return (
    <header className="header-pages">
      <div className="header__logo-wrapper"> 
        <Logo />
      </div> 
      <TopNav />
      <HeaderForm 
        departureDate={departureDate}
        returnDate={returnDate}
        onDateChange={onDateChange}
      />
      <HeaderRow currentStep={currentStep} />
    </header>
  );
}

export default HeaderPages;