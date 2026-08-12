import React from 'react';
import Logo from './Logo';
import TopNav from './TopNav';
import HeroContainer from './HeroContainer'
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header__logo-wrapper"> 
        <Logo />
      </div> 
      <TopNav />
      <HeroContainer /> 
      <div className = "header-row"></div>
    </header>
  );
}

export default Header;