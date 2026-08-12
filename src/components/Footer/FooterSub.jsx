import React from 'react';
import './FooterSub.css';
import ButtonSub from './ButtonSub';
import FooterWeb from './FooterWeb';

function FooterSub() {
  return (
      <div className="footer-sub">
         <h2 className="footer-sub-h2">Подписка</h2>
         <form className="footer-sub-email">
          <label htmlFor="email"
            className="footer-sub-email-lable">
            Будьте в курсе событий
          </label>
          <div className="footer-sub-email-wrapper">
            <input type="email"
              id="email"
              name="email" required
              placeholder="email"
              className="footer-sub-email-input">
            </input>
            <ButtonSub />
          </div>
         </form>
         <FooterWeb />
      </div>
  );
}

export default FooterSub;