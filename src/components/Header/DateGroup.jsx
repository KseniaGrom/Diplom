import React, { useState, useRef, useEffect } from 'react';
import './DateGroup.css';
import DataIcon from '../../Images/DataIcon.png';
import Calendar from '../Calendar/Calendar';

function DateGroup({ onDateChange, initialStartDate, initialEndDate }) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [startDate, setStartDate] = useState(initialStartDate || null);
  const [endDate, setEndDate] = useState(initialEndDate || null);
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
    let newStartDate = startDate;
    let newEndDate = endDate;

    if (activeField === 'start') {
      newStartDate = date;
      setStartDate(date);
    } else if (activeField === 'end') {
      newEndDate = date;
      setEndDate(date);
    }

    setIsCalendarOpen(false);
    setActiveField(null);

    if (onDateChange) {
      onDateChange({
        startDate: newStartDate,
        endDate: newEndDate
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
    <div className="date-group" ref={wrapperRef}>
      <label className="date-group__label">Дата</label>
      <div className="date-inputs">
        <div className="date__input-wrapper">
          <input
            type="text"
            className="date-inputs__field"
            placeholder="ДД/ММ/ГГГГ"
            value={formatDate(startDate)}
            onFocus={() => handleFieldFocus('start')}
            readOnly
          />
          <img
            src={DataIcon}
            alt=""
            className="date__input-icon"
            onClick={() => handleFieldFocus('start')}
          />
          {isCalendarOpen && activeField === 'start' && (
            <Calendar
              onDateSelect={handleDateSelect}
              onClose={() => {
                setIsCalendarOpen(false);
                setActiveField(null);
              }}
            />
          )}
        </div>

        <div className="date__input-wrapper">
          <input
            type="text"
            className="date-inputs__field"
            placeholder="ДД/ММ/ГГГГ"
            value={formatDate(endDate)}
            onFocus={() => handleFieldFocus('end')}
            readOnly
          />
          <img
            src={DataIcon}
            alt=""
            className="date__input-icon"
            onClick={() => handleFieldFocus('end')}
          />
          {isCalendarOpen && activeField === 'end' && (
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
  );
}

export default DateGroup;