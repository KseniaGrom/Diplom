import React from 'react';
import Header from '../components/Header/Header';
import About from '../components/About/About';
import HowWork from '../components/HowWork/HowWork';
import Feedback from '../components/Feedback/Feedback';
import '../index.css';

function App() {
  return (
    <div>
      <Header />
      <About />
      <HowWork />
      <Feedback />
    </div>
  );
}

export default App;