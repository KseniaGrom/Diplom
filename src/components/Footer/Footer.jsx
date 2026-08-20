import React from 'react';
import './Footer.css';
import FooterConnect from './FooterConnect';
import FooterSub from './FooterSub';
import FooterLogo from './FooterLogo';

function Footer({ id }) {
  return (
    <footer id={id} className="footer">
      <div className="footer-conteiner">
        <FooterConnect />
        <FooterSub />
      </div>
      <FooterLogo />
    </footer>
  );
}

export default Footer;