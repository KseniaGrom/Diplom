import React from 'react';
import Logo from './Logo';
import TopNav from './TopNav';
import HeroContainer from './HeroContainer';
import HeaderRow from './HeaderRow';
import './Header.css';

function Header({ isLoading = false, onLoadComplete, onSearchStart }) {
  
  return (
    <header className="header">
      <div className="header__logo-wrapper"> 
        <Logo />
      </div> 
      <TopNav />
      <HeroContainer onSearchStart={onSearchStart} />
      <HeaderRow 
        isLoading={isLoading}
        onLoadComplete={onLoadComplete}
      />
    </header>
  );
}

export default Header;