import React, { useState } from 'react';
import './Error.css';
import HeaderPages from '../HeaderPages/HeaderPages';
import ErorrIcon from '../../Images/exclamation.png';
import ClearButton from '../ClearButton/ClearButton';

function Error({ onClose, onHome }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  const handleHome = () => {
    if (onHome) {
      onHome();
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="error">
      <HeaderPages />
      <div className="error-container">
        <div className="error-head">
          <img
            src={ErorrIcon}
            alt=""
            className="error-icon"
          />
        </div>
        <div className="error-content">
          <p className="error-text-top">Таким образом консультация с широким активом в значительной степени обуславливает создание модели развития.</p>
          <p className="error-text">Повседневная практика показывает, что сложившаяся структура организации играет важную роль в формировании существенных финансовых и административных</p>
        </div>
        <div className="error-button">
          <ClearButton onClick={handleClose} />
        </div>
      </div>
    </div>
  );
}

export default Error;