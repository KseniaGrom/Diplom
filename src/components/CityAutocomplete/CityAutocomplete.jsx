import React, { useState, useRef, useEffect } from 'react';
import { getCities } from '../../api/api';
import './CityAutocomplete.css';

function CityAutocomplete({
  value = '',
  onChange,
  placeholder = ''
}) {
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestionText, setSuggestionText] = useState('');
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const debounceTimer = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
        setSuggestionText('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (value !== inputValue) {
      setInputValue(value);
    }
  }, [value]);

  const fetchCities = async (query) => {
    if (!query || query.trim().length === 0) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    try {
      const data = await getCities(query.trim());
      setSuggestions(data || []);
      setIsOpen(data && data.length > 0);
    } catch (error) {
      console.error('❌ Ошибка поиска городов:', error);
      setSuggestions([]);
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSearch = (query) => {
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      fetchCities(query);
    }, 300);
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputValue(val);
    setHighlightedIndex(-1);

    if (val.trim() && suggestions.length > 0) {
      const firstMatch = suggestions[0]?.name || '';
      if (firstMatch.toLowerCase().startsWith(val.toLowerCase())) {
        const remaining = firstMatch.slice(val.length);
        setSuggestionText(remaining);
      } else {
        setSuggestionText('');
      }
    } else {
      setSuggestionText('');
    }

    debouncedSearch(val);
  };

  const handleSelectCity = (city, cityId) => {
    setInputValue(city);
    setIsOpen(false);
    setSuggestions([]);
    setSuggestionText('');
    setHighlightedIndex(-1);

    if (onChange) {
      onChange(city, cityId);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab' && suggestionText) {
      e.preventDefault();
      const firstMatch = suggestions[0];
      if (firstMatch) {
        handleSelectCity(firstMatch.name, firstMatch._id);
      }
      return;
    }

    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
        const item = suggestions[highlightedIndex];
        handleSelectCity(item.name, item._id);
      } else if (suggestions.length > 0) {
        const item = suggestions[0];
        handleSelectCity(item.name, item._id);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setSuggestionText('');
    }
  };

  const handleFocus = () => {
    if (inputValue.trim()) {
      fetchCities(inputValue);
    }
  };

  const getSuggestionOffset = () => {
    if (!inputRef.current) return 0;
    const input = inputRef.current;
    const style = window.getComputedStyle(input);
    const paddingLeft = parseFloat(style.paddingLeft) || 21;
    const charWidth = 10;
    const textWidth = inputValue.length * charWidth;
    return paddingLeft + textWidth + 4;
  };

  return (
    <div className="city-autocomplete" ref={wrapperRef}>
      <div className="city-autocomplete__input-wrapper">
        <input
          ref={inputRef}
          type="text"
          className="direction-group__input"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          autoComplete="off"
        />
        {suggestionText && inputValue.trim() && (
          <span
            className="city-autocomplete__suggestion"
            style={{
              left: `${getSuggestionOffset()}px`
            }}
          >
            {suggestionText}
          </span>
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="city-autocomplete__dropdown">
          {suggestions.map((item, index) => (
            <div
              key={item._id || item.name}
              className={`city-autocomplete__item ${index === highlightedIndex ? 'city-autocomplete__item--highlighted' : ''}`}
              onClick={() => handleSelectCity(item.name, item._id)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CityAutocomplete;