import React, { useState, useRef, useEffect } from 'react';
import './CityAutocomplete.css';

const CITIES = [
  'Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань',
  'Нижний Новгород', 'Челябинск', 'Омск', 'Самара', 'Ростов-на-Дону',
  'Уфа', 'Красноярск', 'Пермь', 'Воронеж', 'Волгоград',
  'Краснодар', 'Саратов', 'Тюмень', 'Тольятти', 'Ижевск',
  'Барнаул', 'Ульяновск', 'Иркутск', 'Хабаровск', 'Ярославль',
  'Владивосток', 'Махачкала', 'Томск', 'Оренбург', 'Кемерово',
  'Новокузнецк', 'Рязань', 'Астрахань', 'Набережные Челны', 'Пенза',
  'Липецк', 'Киров', 'Тула', 'Чебоксары', 'Калининград',
  'Брянск', 'Курск', 'Иваново', 'Магнитогорск', 'Тверь',
  'Ставрополь', 'Белгород', 'Сочи', 'Архангельск', 'Владимир',
  'Мурманск', 'Смоленск', 'Якутск', 'Чита', 'Орёл',
  'Вологда', 'Саранск', 'Тамбов', 'Владикавказ', 'Петрозаводск',
  'Кострома', 'Комсомольск-на-Амуре', 'Таганрог', 'Сыктывкар',
  'Нижний Тагил', 'Благовещенск', 'Ангарск', 'Братск', 'Великий Новгород',
  'Дзержинск', 'Шахты', 'Орск', 'Стерлитамак', 'Грозный',
  'Нижневартовск', 'Йошкар-Ола', 'Сургут', 'Майкоп', 'Назрань',
  'Элиста', 'Псков', 'Абакан', 'Улан-Удэ', 'Кызыл',
  'Бийск', 'Прокопьевск', 'Балашиха', 'Химки', 'Подольск',
  'Королёв', 'Мытищи', 'Люберцы', 'Красногорск', 'Одинцово',
  'Домодедово', 'Раменское', 'Долгопрудный', 'Реутов', 'Жуковский'
];

function CityAutocomplete({ 
  value = '', 
  onChange,
  onSelect,
  placeholder = 'Откуда'
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [suggestionText, setSuggestionText] = useState('');
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

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

  const getFirstSuggestion = (query) => {
    if (!query.trim()) return '';
    const lowerQuery = query.toLowerCase().trim();
    const found = CITIES.find(city => 
      city.toLowerCase().startsWith(lowerQuery)
    );
    return found || '';
  };

  const filterCities = (query) => {
    if (!query.trim()) {
      return CITIES.slice(0, 10);
    }
    
    const lowerQuery = query.toLowerCase().trim();
    const filtered = CITIES.filter(city => 
      city.toLowerCase().includes(lowerQuery)
    );
    
    filtered.sort((a, b) => {
      const aStarts = a.toLowerCase().startsWith(lowerQuery);
      const bStarts = b.toLowerCase().startsWith(lowerQuery);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return a.localeCompare(b);
    });
    
    return filtered.slice(0, 15);
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setHighlightedIndex(-1);
    
    if (onChange) {
      onChange(val);
    }
    
    const filtered = filterCities(val);
    setSuggestions(filtered);
    setIsOpen(filtered.length > 0);
    
    if (val.trim()) {
      const firstMatch = getFirstSuggestion(val);
      if (firstMatch && firstMatch !== val && firstMatch.startsWith(val)) {
        const remaining = firstMatch.slice(val.length);
        setSuggestionText(remaining);
      } else {
        setSuggestionText('');
      }
    } else {
      setSuggestionText('');
    }
  };

  const handleSelectCity = (city) => {
    setIsOpen(false);
    setSuggestions([]);
    setHighlightedIndex(-1);
    setSuggestionText('');
    
    if (onChange) {
      onChange(city);
    }
    if (onSelect) {
      onSelect(city);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab' && suggestionText) {
      e.preventDefault();
      handleSelectCity(value + suggestionText);
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
        handleSelectCity(suggestions[highlightedIndex]);
      } else if (suggestions.length > 0) {
        handleSelectCity(suggestions[0]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setSuggestionText('');
    }
  };

  const handleFocus = () => {
    if (!value.trim()) {
      const filtered = CITIES.slice(0, 10);
      setSuggestions(filtered);
      setIsOpen(true);
    } else {
      const filtered = filterCities(value);
      setSuggestions(filtered);
      setIsOpen(filtered.length > 0);
    }
  };

  const getSuggestionOffset = () => {
    if (!inputRef.current) return 0;
    const input = inputRef.current;
    const style = window.getComputedStyle(input);
    const paddingLeft = parseFloat(style.paddingLeft) || 21;
    const charWidth = 10;
    const textWidth = value.length * charWidth;
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
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          autoComplete="off"
        />
        {suggestionText && value.trim() && (
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
          {suggestions.map((city, index) => (
            <div
              key={city}
              className={`city-autocomplete__item ${index === highlightedIndex ? 'city-autocomplete__item--highlighted' : ''}`}
              onClick={() => handleSelectCity(city)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              {city}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CityAutocomplete;