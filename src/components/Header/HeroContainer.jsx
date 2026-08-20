import React from 'react';
import HeroTitle from './HeroTitle';
import SearchForm from './SearchForm';
import './HeroContainer.css';

function HeroContainer({ onSearchStart }) {
  return (
    <div className="hero-container">
      <HeroTitle />
      <SearchForm onSearchStart={onSearchStart} />
    </div>
  );
}

export default HeroContainer;