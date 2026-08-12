import React, { useState, useRef, useEffect } from 'react';
import './SideCost.css';

function SideCost() {
  const minValue = 1920;
  const maxValue = 7000;
  const priceGap = 500;

  const defaultMax = 4500;
  
  const [minPrice, setMinPrice] = useState(minValue);
  const [maxPrice, setMaxPrice] = useState(defaultMax);
  
  const sliderRef = useRef(null);

  useEffect(() => {
    const minPercent = ((minPrice - minValue) / (maxValue - minValue)) * 100;
    const maxPercent = ((maxPrice - minValue) / (maxValue - minValue)) * 100;
    
    if (sliderRef.current) {
      sliderRef.current.style.left = `${minPercent}%`;
      sliderRef.current.style.right = `${100 - maxPercent}%`;
    }
  }, [minPrice, maxPrice]);

  const handleMinChange = (e) => {
    let value = parseInt(e.target.value);
    if (value > maxPrice - priceGap) {
      value = maxPrice - priceGap;
    }
    setMinPrice(value);
  };

  const handleMaxChange = (e) => {
    let value = parseInt(e.target.value);
    if (value < minPrice + priceGap) {
      value = minPrice + priceGap;
    }
    setMaxPrice(value);
  };

  const showMinLabel = minPrice !== minValue;
  const showMaxLabel = maxPrice !== maxValue;

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
          step="10"
          value={minPrice}
          onChange={handleMinChange}
        />
        <input
          type="range"
          className="side-cost__range side-cost__range--max"
          min={minValue}
          max={maxValue}
          step="10"
          value={maxPrice}
          onChange={handleMaxChange}
        />
      </div>
    </div>
  );
}

export default SideCost;