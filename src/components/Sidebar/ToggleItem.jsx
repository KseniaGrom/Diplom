import React, { useState } from 'react';
import './ToggleItem.css';

function ToggleItem({ icon, label, defaultOn = false }) {
  const [isOn, setIsOn] = useState(defaultOn);

  return (
    <div className="toggle-item">
      <img src={icon} alt="" className="toggle-item__icon" />
      <span className="toggle-item__label">{label}</span>
      <button
        className={`toggle-item__btn ${isOn ? 'toggle-item__btn--on' : ''}`}
        onClick={() => setIsOn(!isOn)}
      >
        <span className="toggle-item__circle"></span>
      </button>
    </div>
  );
}

export default ToggleItem;