import React, { useState } from 'react';
import './Calendar.css';

function Calendar({ onDateSelect, onClose }) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);

  const months = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const getDaysInPrevMonth = (month, year) => {
    if (month === 0) {
      return new Date(year - 1, 12, 0).getDate();
    }
    return new Date(year, month, 0).getDate();
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateClick = (day, isPrevMonth, isNextMonth) => {
    if (isPrevMonth || isNextMonth) return;

    const today = new Date();
    const date = new Date(currentYear, currentMonth, day);

    if (date < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
      return;
    }

    setSelectedDate(date);
    if (onDateSelect) {
      onDateSelect(date);
    }
    if (onClose) {
      onClose();
    }
  };

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const daysInPrevMonth = getDaysInPrevMonth(currentMonth, currentYear);
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();

    const days = [];

    const prevMonthDays = (firstDay === 0 ? 6 : firstDay - 1);
    for (let i = prevMonthDays - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      days.push(
        <div
          key={`prev-${day}`}
          className="calendar__day calendar__day--other-month"
        >
          {day}
        </div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isPast = date < new Date(todayYear, todayMonth, todayDate);
      const isToday = day === todayDate && currentMonth === todayMonth && currentYear === todayYear;
      const isSunday = new Date(currentYear, currentMonth, day).getDay() === 0;
      const isSelected = selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === currentMonth &&
        selectedDate.getFullYear() === currentYear;

      days.push(
        <div
          key={day}
          className={`calendar__day 
            ${isPast ? 'calendar__day--past' : ''} 
            ${isToday ? 'calendar__day--today' : ''} 
            ${isSunday ? 'calendar__day--sunday' : ''} 
            ${isSelected ? 'calendar__day--selected' : ''}`}
          onClick={() => handleDateClick(day, false, false)}
        >
          {day}
        </div>
      );
    }

    const totalDays = prevMonthDays + daysInMonth;
    const remainingDays = 42 - totalDays;
    for (let day = 1; day <= remainingDays; day++) {
      days.push(
        <div
          key={`next-${day}`}
          className="calendar__day calendar__day--other-month"
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar-wrapper">
      <div className="calendar__arrow-top"></div>
      <div className="calendar">
        <div className="calendar__header">
          <button className="calendar__nav calendar__nav--prev" onClick={handlePrevMonth}>
            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 8l4-3.5v7L6 8z" fill="#292929"></path>
            </svg>
          </button>
          <span className="calendar__month-year">
            {months[currentMonth]}
          </span>
          <button className="calendar__nav calendar__nav--next" onClick={handleNextMonth}>
            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 8l-4 3.5v-7L10 8z" fill="#292929"></path>
            </svg>
          </button>
        </div>

        <div className="calendar__divider"></div>

        <div className="calendar__days">
          {renderDays()}
        </div>
      </div>
    </div>
  );
}

export default Calendar;