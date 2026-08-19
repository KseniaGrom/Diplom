import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckButton.css';

function CheckButton({ children = 'Изменить' }) {
  const navigate = useNavigate();
  
  return (
    <button className="check-button" onClick={() => navigate(-1)}>
      {children}
    </button>
  );
}

export default CheckButton;