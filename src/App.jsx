import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tickets from './pages/Tickets';
import ChoosingPlaces from './pages/ChoosingPlaces';
import Passengers from './pages/Passengers';
import Footer from './components/Footer/Footer';
import Pay from './pages/Pay';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/choosingplaces" element={<ChoosingPlaces />} />
          <Route path="/passengers" element={<Passengers />} />
          <Route path="/pay" element={<Pay />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;