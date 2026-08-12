import React, { useState, useRef, useEffect } from 'react';
import './SideThere.css';
import ThereIcon from '../../Images/SideThere/there.png';

function SideThere() {
  const [isExpanded, setIsExpanded] = useState(false);

  const minValue = 0;
  const maxValue = 24;
  const timeGap = 0.5;

  const defaultStartDeparture = 0;
  const defaultEndDeparture = 11;
  const [startDeparture, setStartDeparture] = useState(defaultStartDeparture);
  const [endDeparture, setEndDeparture] = useState(defaultEndDeparture);
  const sliderRefDeparture = useRef(null);

  const defaultStartArrival = 5;
  const defaultEndArrival = 11;
  const [startArrival, setStartArrival] = useState(defaultStartArrival);
  const [endArrival, setEndArrival] = useState(defaultEndArrival);
  const sliderRefArrival = useRef(null);

  const updateSlider = (ref, start, end) => {
    if (ref.current) {
      const minPercent = ((start - minValue) / (maxValue - minValue)) * 100;
      const maxPercent = ((end - minValue) / (maxValue - minValue)) * 100;
      ref.current.style.left = `${minPercent}%`;
      ref.current.style.right = `${100 - maxPercent}%`;
    }
  };

  useEffect(() => {
    if (isExpanded) {
      setTimeout(() => {
        updateSlider(sliderRefDeparture, startDeparture, endDeparture);
        updateSlider(sliderRefArrival, startArrival, endArrival);
      }, 50);
    }
  }, [isExpanded]);

  useEffect(() => {
    updateSlider(sliderRefDeparture, startDeparture, endDeparture);
  }, [startDeparture, endDeparture]);

  useEffect(() => {
    updateSlider(sliderRefArrival, startArrival, endArrival);
  }, [startArrival, endArrival]);

  const handleStartDepartureChange = (e) => {
    let value = parseFloat(e.target.value);
    if (value > endDeparture - timeGap) {
      value = endDeparture - timeGap;
    }
    setStartDeparture(value);
  };

  const handleEndDepartureChange = (e) => {
    let value = parseFloat(e.target.value);
    if (value < startDeparture + timeGap) {
      value = startDeparture + timeGap;
    }
    setEndDeparture(value);
  };

  const handleStartArrivalChange = (e) => {
    let value = parseFloat(e.target.value);
    if (value > endArrival - timeGap) {
      value = endArrival - timeGap;
    }
    setStartArrival(value);
  };

  const handleEndArrivalChange = (e) => {
    let value = parseFloat(e.target.value);
    if (value < startArrival + timeGap) {
      value = startArrival + timeGap;
    }
    setEndArrival(value);
  };

  const formatTime = (hours) => {
    const whole = Math.floor(hours);
    const minutes = hours % 1 === 0 ? '00' : '30';
    return `${String(whole).padStart(2, '0')}:${minutes}`;
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="sidethere">
      <div className="sidethere-wrapper">
        <div className="sidethere-item">
          <img 
            src={ThereIcon} 
            alt="Туда" 
            className="sidethere__icon sidethere__icon--left" 
          />
          <span className="sidethere__text">Туда</span>
          <span 
            className={`sidethere__icon sidethere__icon--right sidethere__icon--plus ${isExpanded ? 'sidethere__icon--plus--open' : ''}`}
            onClick={toggleExpand}
          ></span>
        </div>

        {isExpanded && (
          <div className="sidethere__expand">
            <div className="sidethere__slider-values">
              <span className="sidethere__value">Время отбытия</span>
            </div>

            <div className="sidethere__slider-wrapper">
              <div className="sidethere__slider-track">
                <div className="sidethere__slider-fill" ref={sliderRefDeparture}></div>
              </div>
            </div>

            <div className="sidethere__range-inputs">
              <span className="sidethere__range-label sidethere__range-label--min">
                {formatTime(minValue)}
              </span>
              <span className="sidethere__range-label sidethere__range-label--max">
                {formatTime(maxValue)}
              </span>

              {startDeparture !== minValue && (
                <span 
                  className="sidethere__thumb-value" 
                  style={{ left: `${((startDeparture - minValue) / (maxValue - minValue)) * 100}%` }}
                >
                  {formatTime(startDeparture)}
                </span>
              )}
              {endDeparture !== maxValue && (
                <span 
                  className="sidethere__thumb-value sidethere__thumb-value--max" 
                  style={{ left: `${((endDeparture - minValue) / (maxValue - minValue)) * 100}%` }}
                >
                  {formatTime(endDeparture)}
                </span>
              )}

              <input
                type="range"
                className="sidethere__range sidethere__range--min"
                min={minValue}
                max={maxValue}
                step="0.5"
                value={startDeparture}
                onChange={handleStartDepartureChange}
              />
              <input
                type="range"
                className="sidethere__range sidethere__range--max"
                min={minValue}
                max={maxValue}
                step="0.5"
                value={endDeparture}
                onChange={handleEndDepartureChange}
              />
            </div>

            <div className="sidethere__slider-values sidethere__slider-values--arrival">
              <span className="sidethere__value">Время прибытия</span>
            </div>

            <div className="sidethere__slider-wrapper">
              <div className="sidethere__slider-track">
                <div className="sidethere__slider-fill" ref={sliderRefArrival}></div>
              </div>
            </div>

            <div className="sidethere__range-inputs">
              <span className="sidethere__range-label sidethere__range-label--min">
                {formatTime(minValue)}
              </span>
              <span className="sidethere__range-label sidethere__range-label--max">
                {formatTime(maxValue)}
              </span>

              {startArrival !== minValue && (
                <span 
                  className="sidethere__thumb-value" 
                  style={{ left: `${((startArrival - minValue) / (maxValue - minValue)) * 100}%` }}
                >
                  {formatTime(startArrival)}
                </span>
              )}
              {endArrival !== maxValue && (
                <span 
                  className="sidethere__thumb-value sidethere__thumb-value--max" 
                  style={{ left: `${((endArrival - minValue) / (maxValue - minValue)) * 100}%` }}
                >
                  {formatTime(endArrival)}
                </span>
              )}

              <input
                type="range"
                className="sidethere__range sidethere__range--min"
                min={minValue}
                max={maxValue}
                step="0.5"
                value={startArrival}
                onChange={handleStartArrivalChange}
              />
              <input
                type="range"
                className="sidethere__range sidethere__range--max"
                min={minValue}
                max={maxValue}
                step="0.5"
                value={endArrival}
                onChange={handleEndArrivalChange}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SideThere;