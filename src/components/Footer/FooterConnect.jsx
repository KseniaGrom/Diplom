import React from 'react';
import './FooterConnect.css';
import phoneIcon from '../../Images/Footer/Phone.png';
import emailIcon from '../../Images/Footer/Email.png';
import SkypeIcon from '../../Images/Footer/Skype.png';
import locationIcon from '../../Images/Footer/Adres.png';

function FooterConnect() {
  const links = [
    { 
      id: 1, 
      text: '8 (800) 000 00 00', 
      icon: phoneIcon, 
      alt: 'телефон' 
    },
    { 
      id: 2, 
      text: 'inbox@mail.ru', 
      icon: emailIcon, 
      alt: 'email' 
    },
    { 
      id: 3, 
      text: 'tu.train.tickets', 
      icon: SkypeIcon, 
      alt: 'skype' 
    },
    { 
      id: 4, 
      text: 'г. Москва ул. Московская 27-35 555 555', 
      icon: locationIcon, 
      alt: 'адрес' 
    }
  ];

  return (
    <div className="footer-connect">
      <h2 className="footer-connect-h2">Свяжитесь с нами</h2>
      <ul className="footer-connect-links">
        {links.map((item) => (
          <li key={item.id} className="footer-connect-links__item">
            <img 
              src={item.icon} 
              alt={item.alt} 
              className="footer-connect-links__icon" 
            />
            <a href="#" className="footer-connect-links__link">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FooterConnect;