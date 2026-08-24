import React, { useState, useRef, useEffect } from 'react';
import './SideCost.css';

function SideCost({ onPriceChange }) {
  const minValue = 500;
  const maxValue = 7000;
  const priceGap = 500;

  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  
  const sliderRef = useRef(null);

  useEffect(() => {
    const currentMin = minPrice !== null ? minPrice : minValue;
    const currentMax = maxPrice !== null ? maxPrice : maxValue;
    
    const minPercent = ((currentMin - minValue) / (maxValue - minValue)) * 100;
    const maxPercent = ((currentMax - minValue) / (maxValue - minValue)) * 100;
    
    if (sliderRef.current) {
      sliderRef.current.style.left = `${minPercent}%`;
      sliderRef.current.style.right = `${100 - maxPercent}%`;
    }

    if (onPriceChange) {
      onPriceChange(minPrice, maxPrice);
    }
  }, [minPrice, maxPrice]);

  const handleMinChange = (e) => {
    let value = parseInt(e.target.value);
    const currentMax = maxPrice !== null ? maxPrice : maxValue;
    if (value > currentMax - priceGap) {
      value = currentMax - priceGap;
    }
    setMinPrice(value);
  };

  const handleMaxChange = (e) => {
    let value = parseInt(e.target.value);
    const currentMin = minPrice !== null ? minPrice : minValue;
    if (value < currentMin + priceGap) {
      value = currentMin + priceGap;
    }
    setMaxPrice(value);
  };

  const showMinLabel = minPrice !== null && minPrice > minValue;
  const showMaxLabel = maxPrice !== null && maxPrice < maxValue;

  return (
    <div className="side-cost">
      <h3 className="side-cost__title">Стоимость</h3>
      
      <div className="side-cost__values">
        <span className="side-cost__value">от</span>
        <span className="side-cost__value">до</span>
      </div>

      <div className="side-cost__slider-wrapper">
        <div className="side-cost__slider-track">
          <div className="side-cost__slider-fill" ref={sliderRef}></div>
        </div>
      </div>

      <div className="side-cost__range-inputs">
        <span className="side-cost__range-label side-cost__range-label--min">
          {minValue}
        </span>
        <span className="side-cost__range-label side-cost__range-label--max">
          {maxValue}
        </span>

        {showMinLabel && (
          <span 
            className="side-cost__thumb-value" 
            style={{ left: `${((minPrice - minValue) / (maxValue - minValue)) * 100}%` }}
          >
            {minPrice}
          </span>
        )}
        {showMaxLabel && (
          <span 
            className="side-cost__thumb-value side-cost__thumb-value--max" 
            style={{ left: `${((maxPrice - minValue) / (maxValue - minValue)) * 100}%` }}
          >
            {maxPrice}
          </span>
        )}

        <input
          type="range"
          className="side-cost__range side-cost__range--min"
          min={minValue}
          max={maxValue}
          step="100"
          value={minPrice !== null ? minPrice : minValue}
          onChange={handleMinChange}
        />
        <input
          type="range"
          className="side-cost__range side-cost__range--max"
          min={minValue}
          max={maxValue}
          step="100"
          value={maxPrice !== null ? maxPrice : maxValue}
          onChange={handleMaxChange}
        />
      </div>
    </div>
  );
}

export default SideCost;