import React from 'react';
import './CheckSectionHeader.css';

function CheckSectionHeader({ title }) {
  return (
    <div className="check-section-header">
      <h2 className="check-section-header__title">{title}</h2>
    </div>
  );
}

export default CheckSectionHeader;