import React, { useState, useRef, useEffect } from 'react';
import './CustomSelect.css';
import selectArrow from '../../Images/PassengerForm/select.png';

function CustomSelect({ options, value, onChange, placeholder, className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value || options[0] || '');
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <div className={`custom-select ${className}`} ref={wrapperRef}>
      <div 
        className="custom-select__header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="custom-select__value">{selected || placeholder}</span>
        <img 
          src={selectArrow} 
          alt="▼" 
          className={`custom-select__arrow ${isOpen ? 'custom-select__arrow--open' : ''}`}
        />
      </div>

      {isOpen && (
        <div className="custom-select__dropdown">
          {options.map((option) => (
            <div
              key={option}
              className={`custom-select__option ${option === selected ? 'custom-select__option--active' : ''}`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomSelect;