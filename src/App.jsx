import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tickets from './pages/Tickets';
import ChoosingPlaces from './pages/ChoosingPlaces';
import Passengers from './pages/Passengers';
import Footer from './components/Footer/Footer';
import Pay from './pages/Pay';
import Check from './pages/Check';
import Final from './pages/FInal';

function App() {
  return (
    <BrowserRouter basename="/Diplom">
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/choosingplaces" element={<ChoosingPlaces />} />
          <Route path="/passengers" element={<Passengers />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/check" element={<Check />} />
          <Route path="/final" element={<Final />} />
        </Routes>
         <Footer id="footer" />
      </div>
    </BrowserRouter>
  );
}

export default App;