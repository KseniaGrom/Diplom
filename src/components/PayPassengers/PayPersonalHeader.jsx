import React from 'react';
import './PayPersonalHeader.css';

function PayPersonalHeader({ title, noTopBorder }) {
  return (
    <div 
      className={`pay-personal-header ${noTopBorder ? 'pay-personal-header--no-top' : ''}`}
    >
      <h2 className="pay-personal-header__title">{title}</h2>
    </div>
  );
}

export default PayPersonalHeader;