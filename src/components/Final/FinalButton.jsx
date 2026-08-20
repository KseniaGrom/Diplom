import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FinalButton.css';

function FinalButton({ to = '/', children = 'ВЕРНУТЬСЯ НА ГЛАВНУЮ' }) {
  const navigate = useNavigate();

  return (
    <button className="final-button" onClick={() => navigate(to)}>
      {children}
    </button>
  );
}

export default FinalButton;