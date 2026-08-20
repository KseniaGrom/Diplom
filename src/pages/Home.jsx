import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header/Header';
import About from '../components/About/About';
import HowWork from '../components/HowWork/HowWork';
import Feedback from '../components/Feedback/Feedback';
import '../index.css';

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState(null);

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  }, [location]);

  const handleSearchStart = (data) => {
    setSearchData(data);
    setIsLoading(true);
  };

  const handleLoadComplete = () => {
    setIsLoading(false);
    navigate('/tickets', {
      state: {
        departureDate: searchData?.departureDate,
        returnDate: searchData?.returnDate,
      }
    });
  };

  return (
    <div>
      <Header 
        isLoading={isLoading}
        onLoadComplete={handleLoadComplete}
        onSearchStart={handleSearchStart}
      />
      <section id="about">
        <About />
      </section>
      <section id="how-work">
        <HowWork />
      </section>
      <section id="feedback">
        <Feedback />
      </section>
    </div>
  );
}

export default Home;