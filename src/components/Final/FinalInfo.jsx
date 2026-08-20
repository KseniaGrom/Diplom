import React from 'react';
import './FinalInfo.css';
import emailIcon from '../../Images/Final/Email.png';
import ticketIcon from '../../Images/Final/Tikets.png';
import peopleIcon from '../../Images/Final/Peopl.png';

function FinalInfo() {
  return (
    <div className="final-info">
      <div className="final-info-wrapper">
        <div className="final-info__item">
          <img src={emailIcon} alt="Email" className="final-info__icon" />
          <p className="final-info__text">билеты будут отправлены на ваш 
            <span className="final-info__span"> e-mail</span>
          </p>
        </div>
        
        <div className="final-info__item">
          <img src={ticketIcon} alt="Ticket" className="final-info__icon" />
          <p className="final-info__text">
            <span className="final-info__span">распечатайте </span>
          и сохраняйте билеты до даты поездки</p>
        </div>
        
        <div className="final-info__item">
          <img src={peopleIcon} alt="People" className="final-info__icon" />
          <p className="final-info__text">
            <span className="final-info__span">предъявите </span>
            распечатанные билеты при посадке</p>
        </div>
      </div>
    </div>
  );
}

export default FinalInfo;