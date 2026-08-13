import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ChangeTrainButton.css';

function ChangeTrainButton() {
  const navigate = useNavigate();

  return (
    <button className="change-train-btn" onClick={() => navigate('/tickets')}>
      Выбрать другой поезд
    </button>
  );
}

export default ChangeTrainButton;