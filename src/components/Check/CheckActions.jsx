import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckActions.css';

function CheckActions({ onConfirm }) {
  const navigate = useNavigate();

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      alert('Заказ подтвержден! Спасибо за покупку!');
    }
  };

  return (
    <div className="check-actions">
      <button 
        className="check-actions__button check-actions__button--back"
        onClick={() => navigate(-1)}
      >
        Подтвердить
      </button>
    </div>
  );
}

export default CheckActions;