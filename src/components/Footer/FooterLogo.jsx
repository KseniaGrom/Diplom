import React from 'react';
import './FooterLogo.css';
import UpIcon from '../../Images/Footer/Up.png';

function FooterLogo() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="footer-logo">
      <div className="footer-row"></div>
      <div className="footer-logo-container">
        <span className="footer-logo-span">Лого</span>
        <div className="footer-logo-up">
          <a 
            href="#top" 
            className="footer-logo-up-link" 
            onClick={scrollToTop}
          >
            <img 
              src={UpIcon} 
              alt="Вверх" 
              className="footer-logo-links__icon" 
            />
          </a>
        </div>
        <div className="footer-logo-year">
          <span className="footer-logo-year-span">2018 WEB</span>
        </div>
      </div>
    </div>
  );
}

export default FooterLogo;