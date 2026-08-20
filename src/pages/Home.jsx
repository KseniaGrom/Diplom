import React, { useState } from 'react';
import Header from '../components/Header/Header';
import About from '../components/About/About';
import HowWork from '../components/HowWork/HowWork';
import Feedback from '../components/Feedback/Feedback';
import '../index.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchStart = () => {
    setIsLoading(true);
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

export default App;