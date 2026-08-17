import React from 'react';
import './ClearButton.css';

function ClearButton({ onClick }) {
  return (
    <button className="clearbutton" onClick={onClick}>
      Понятно
    </button>
  );
}

export default ClearButton;