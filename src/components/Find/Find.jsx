import React, { useState, useRef, useEffect } from 'react';
import './Find.css';

function Find({ 
  count, 
  showValue = '5', 
  onShowChange,
  sortValue = 'времени',
  onSortChange 
}) {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [localSortValue, setLocalSortValue] = useState(sortValue);
  const [showValueState, setShowValueState] = useState(showValue);

  const sortRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sortOptions = ['времени', 'стоимости', 'длительности'];
  const showOptions = ['5', '10', '20'];

  const handleSortSelect = (item) => {
    setLocalSortValue(item);
    setIsSortOpen(false);
    if (onSortChange) {
      onSortChange(item);
    }
  };

  const handleShowOptionClick = (value) => {
    setShowValueState(value);
    if (onShowChange) {
      onShowChange(value);
    }
  };

  return (
    <div className="find">
      <div className="find-wrapper">
        <span className="find__count">найдено {count}</span>
        <div className="find__controls">
          <div className="find__sort" ref={sortRef}>
            <span className="find__sort-label">сортировать по:</span>
            <span 
              className="find__sort-value"
              onClick={() => setIsSortOpen(!isSortOpen)}
            >
              {localSortValue}
            </span>
            {isSortOpen && (
              <div className="find__dropdown">
                {sortOptions.map((item) => (
                  <span
                    key={item}
                    className={item === localSortValue ? 'find__dropdown--active' : ''}
                    onClick={() => handleSortSelect(item)}
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="find__show">
            <span className="find__show-label">показывать по:</span>
            <div className="find__show-options">
              {showOptions.map((item) => (
                <span
                  key={item}
                  className={`find__show-option ${item === showValueState ? 'find__show-option--active' : ''}`}
                  onClick={() => handleShowOptionClick(item)}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Find;