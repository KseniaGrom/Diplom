import React, { useState, useRef, useEffect } from 'react';
import './SideThere.css';
import ThereIcon from '../../Images/SideThere/there.png';

function SideThere({ onTimeDepartureChange, onTimeArrivalChange }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const minValue = 0;
  const maxValue = 24;
  const timeGap = 0.5;

  const [startDeparture, setStartDeparture] = useState(null);
  const [endDeparture, setEndDeparture] = useState(null);
  const sliderRefDeparture = useRef(null);

  const [startArrival, setStartArrival] = useState(null);
  const [endArrival, setEndArrival] = useState(null);
  const sliderRefArrival = useRef(null);

  const updateSlider = (ref, start, end) => {
    if (ref.current) {
      const startVal = start !== null ? start : minValue;
      const endVal = end !== null ? end : maxValue;
      const minPercent = ((startVal - minValue) / (maxValue - minValue)) * 100;
      const maxPercent = ((endVal - minValue) / (maxValue - minValue)) * 100;
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

  useEffect(() => {
    if (onTimeDepartureChange) {
      onTimeDepartureChange(startDeparture, endDeparture);
    }
  }, [startDeparture, endDeparture]);

  useEffect(() => {
    if (onTimeArrivalChange) {
      onTimeArrivalChange(startArrival, endArrival);
    }
  }, [startArrival, endArrival]);

  const handleStartDepartureChange = (e) => {
    let value = parseFloat(e.target.value);
    const endVal = endDeparture !== null ? endDeparture : maxValue;
    if (value > endVal - timeGap) {
      value = endVal - timeGap;
    }
    setStartDeparture(value);
  };

  const handleEndDepartureChange = (e) => {
    let value = parseFloat(e.target.value);
    const startVal = startDeparture !== null ? startDeparture : minValue;
    if (value < startVal + timeGap) {
      value = startVal + timeGap;
    }
    setEndDeparture(value);
  };

  const handleStartArrivalChange = (e) => {
    let value = parseFloat(e.target.value);
    const endVal = endArrival !== null ? endArrival : maxValue;
    if (value > endVal - timeGap) {
      value = endVal - timeGap;
    }
    setStartArrival(value);
  };

  const handleEndArrivalChange = (e) => {
    let value = parseFloat(e.target.value);
    const startVal = startArrival !== null ? startArrival : minValue;
    if (value < startVal + timeGap) {
      value = startVal + timeGap;
    }
    setEndArrival(value);
  };

  const formatTime = (hours) => {
    if (hours === null) return '--:--';
    const whole = Math.floor(hours);
    const minutes = hours % 1 === 0 ? '00' : '30';
    return `${String(whole).padStart(2, '0')}:${minutes}`;
  };

  const showStartDepartureLabel = startDeparture !== null && startDeparture > minValue;
  const showEndDepartureLabel = endDeparture !== null && endDeparture < maxValue;
  const showStartArrivalLabel = startArrival !== null && startArrival > minValue;
  const showEndArrivalLabel = endArrival !== null && endArrival < maxValue;

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

              {showStartDepartureLabel && (
                <span 
                  className="sidethere__thumb-value" 
                  style={{ left: `${((startDeparture - minValue) / (maxValue - minValue)) * 100}%` }}
                >
                  {formatTime(startDeparture)}
                </span>
              )}
              {showEndDepartureLabel && (
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
                value={startDeparture !== null ? startDeparture : minValue}
                onChange={handleStartDepartureChange}
              />
              <input
                type="range"
                className="sidethere__range sidethere__range--max"
                min={minValue}
                max={maxValue}
                step="0.5"
                value={endDeparture !== null ? endDeparture : maxValue}
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

              {showStartArrivalLabel && (
                <span 
                  className="sidethere__thumb-value" 
                  style={{ left: `${((startArrival - minValue) / (maxValue - minValue)) * 100}%` }}
                >
                  {formatTime(startArrival)}
                </span>
              )}
              {showEndArrivalLabel && (
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
                value={startArrival !== null ? startArrival : minValue}
                onChange={handleStartArrivalChange}
              />
              <input
                type="range"
                className="sidethere__range sidethere__range--max"
                min={minValue}
                max={maxValue}
                step="0.5"
                value={endArrival !== null ? endArrival : maxValue}
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