import React, { useState, useRef, useEffect } from 'react';
import './SideDate.css';
import DataIcon from '../../Images/DataIcon.png';
import Calendar from '../Calendar/Calendar';

function SideDate({ onDateChange, initialDepartureDate, initialReturnDate }) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [departureDate, setDepartureDate] = useState(initialDepartureDate || null);
  const [returnDate, setReturnDate] = useState(initialReturnDate || null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
        setActiveField(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDateSelect = (date) => {
    let newDepartureDate = departureDate;
    let newReturnDate = returnDate;
    
    if (activeField === 'departure') {
      newDepartureDate = date;
      setDepartureDate(date);
    } else if (activeField === 'return') {
      newReturnDate = date;
      setReturnDate(date);
    }
    
    setIsCalendarOpen(false);
    setActiveField(null);

    if (onDateChange) {
      onDateChange({
        departureDate: newDepartureDate,
        returnDate: newReturnDate
      });
    }
  };

  const formatDate = (date) => {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleFieldFocus = (field) => {
    setActiveField(field);
    setIsCalendarOpen(true);
  };

  return (
    <div className="sidedate" ref={wrapperRef}>
      <div className="sidedate__group">
        <label className="sidedate__label">Дата поездки</label>
        <div className="sidedate-inputs">
          <div className="sidedate-wrapper">
            <input
              type="text"
              className="sidedate__field"
              placeholder="ДД/ММ/ГГГГ"
              value={formatDate(departureDate)}
              onFocus={() => handleFieldFocus('departure')}
              readOnly
            />
            <img
              src={DataIcon}
              alt=""
              className="sidedate-icon"
              onClick={() => handleFieldFocus('departure')}
            />
            {isCalendarOpen && activeField === 'departure' && (
              <Calendar
                onDateSelect={handleDateSelect}
                onClose={() => {
                  setIsCalendarOpen(false);
                  setActiveField(null);
                }}
              />
            )}
          </div>
        </div>
      </div>

      <div className="sidedate__group">
        <label className="sidedate__label">Дата возвращения</label>
        <div className="sidedate-inputs">
          <div className="sidedate-wrapper">
            <input
              type="text"
              className="sidedate__field"
              placeholder="ДД/ММ/ГГГГ"
              value={formatDate(returnDate)}
              onFocus={() => handleFieldFocus('return')}
              readOnly
            />
            <img
              src={DataIcon}
              alt=""
              className="sidedate-icon"
              onClick={() => handleFieldFocus('return')}
            />
            {isCalendarOpen && activeField === 'return' && (
              <Calendar
                onDateSelect={handleDateSelect}
                onClose={() => {
                  setIsCalendarOpen(false);
                  setActiveField(null);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideDate;