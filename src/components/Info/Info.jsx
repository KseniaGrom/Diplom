import React, { useState } from 'react';
import './Info.css';
import InfoIcon from '../../Images/exclamation.png';
import ClearButton from '../ClearButton/ClearButton';

function Info({ onClose, onHome }) {
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
    <div className="info">
        <div className="info-container">
            <div className="info-head">
                <img
                    src={InfoIcon}
                    alt=''
                    className="info-icon"
                />
            </div>
            <div className="info-content">
                <p className="info-text-top">Таким образом консультация с широким активом в значительной степени обуславливает создание модели развития.</p>
                <p className="info-text">Повседневная практика показывает, что сложившаяся структура организации играет важную роль в формировании существенных финансовых и административных </p>
            </div>
            <div className="info-button">
                <ClearButton />
            </div>
        </div>
    </div>
  );
}

export default Info;