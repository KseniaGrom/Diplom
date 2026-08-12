import React from 'react';
import './HowReasons.css';
import ComputerIcon from '../../Images/HowWork/ComputerIcon.png';
import OficeIcon from '../../Images/HowWork/OficeIcon.png';
import BrowseIcon from '../../Images/HowWork/BrowseIcon.png';

function HowReasons() {
  return (
   <div className="how-it-work-wrapper">
    <div className="how-it-work__wrap_container">
      <img 
          src={ComputerIcon} 
          alt="" 
          className="how-it-work-icon" 
      />
      <p className="how-it-work-text">Удобный заказ на сайте</p>
    </div>
    <div className="how-it-work__wrap_container">
      <img 
        src={OficeIcon} 
        alt="" 
        className="how-it-work-icon" 
      />
      <p className="how-it-work-text">Нет необходимости ехать в офис</p>
    </div>
    <div className="how-it-work__wrap_container">
      <img 
        src={BrowseIcon}  
        alt="" 
        className="how-it-work-icon" 
      />
      <p className="how-it-work-text">Огромный выбор направлений</p>
    </div>
    </div>
  );
}

export default HowReasons;