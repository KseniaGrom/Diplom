import React from 'react';
import './SideDate.css';
import DataIcon from '../../Images/DataIcon.png';

function SideDate() {
  return (
    <div className="sidedate">
        <label className="sidedate__label">Дата поездки</label>
        <div className="sidedate-inputs">
            <div className="sidedate-wrapper">
                <input 
                type="data" 
                className="sidedate__field" 
                placeholder="ДД/ММ/ГГГГ" 
                />
                <img 
                src={DataIcon} 
                alt="" 
                className="sidedate-icon" 
                />
            </div>
        </div>
                <label className="sidedate__label">Дата возвращения</label>
        <div className="sidedate-inputs">
            <div className="sidedate-wrapper">
                <input 
                type="data" 
                className="sidedate__field" 
                placeholder="ДД/ММ/ГГГГ" 
                />
                <img 
                src={DataIcon} 
                alt="" 
                className="sidedate-icon" 
                />
            </div>
        </div>
    </div>
  );
}

export default SideDate;