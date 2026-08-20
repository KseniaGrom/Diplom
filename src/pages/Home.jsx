import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import About from '../components/About/About';
import HowWork from '../components/HowWork/HowWork';
import Feedback from '../components/Feedback/Feedback';
import '../index.css';

function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState(null);

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
      <About />
      <HowWork />
      <Feedback />
    </div>
  );
}

export default App;