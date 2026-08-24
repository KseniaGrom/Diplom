import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import About from '../components/About/About';
import HowWork from '../components/HowWork/HowWork';
import Feedback from '../components/Feedback/Feedback';
import '../index.css';

function Home() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchStart = (data) => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigate('/tickets', {
        state: {
          fromCity: data.fromCity,
          toCity: data.toCity,
          fromCityId: data.fromCityId,
          toCityId: data.toCityId,
          departureDate: data.departureDate,
          returnDate: data.returnDate,
          params: data.params
        }
      });
    }, 500);
  };

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  return (
    <div>
      <Header 
        isLoading={isLoading}
        onLoadComplete={handleLoadComplete}
        onSearchStart={handleSearchStart}
      />
      <About />
      <HowWork />
      <Feedback />
    </div>
  );
}

export default Home;