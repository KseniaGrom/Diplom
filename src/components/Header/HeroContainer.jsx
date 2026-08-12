import React from 'react';
import HeroTitle from './HeroTitle';
import SearchForm from './SearchForm';
import './HeroContainer.css';

function HeroContainer() {
  return (
    <div className="hero-container">
      <HeroTitle />
      <SearchForm />
    </div>
  );
}

export default HeroContainer;