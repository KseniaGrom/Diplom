import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tickets from './pages/Tickets';
import ChoosingPlaces from './pages/ChoosingPlaces';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/choosingplaces" element={<ChoosingPlaces />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;