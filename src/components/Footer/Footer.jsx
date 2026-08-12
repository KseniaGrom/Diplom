import React from 'react';
import './Footer.css';
import FooterConnect from './FooterConnect';
import FooterSub from './FooterSub';
import FooterLogo from './FooterLogo';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-conteiner">
        <FooterConnect />
        <FooterSub />
      </div>
      <FooterLogo />
    </footer>
  );
}

export default Footer;