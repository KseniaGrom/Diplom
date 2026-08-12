import React from 'react';
import './FooterWeb.css';
import YoutubeIcon from '../../Images/Footer/YouTube.png';
import InIcon from '../../Images/Footer/In.png';
import GoogleIcon from '../../Images/Footer/Google+.png';
import FacebookIcon from '../../Images/Footer/Facebook.png';
import TwitterIcon from '../../Images/Footer/Twitter.png';

function FooterWeb() {
  const socialLinks = [
    { 
      id: 1, 
      icon: YoutubeIcon, 
      alt: 'Youtube',
      href: 'https://youtube.com'
    },
    { 
      id: 2, 
      icon: InIcon, 
      alt: 'In',
    },
    { 
      id: 3, 
      icon: GoogleIcon, 
      alt: 'Google+',
      href: 'https://google.com'
    },
    { 
      id: 4, 
      icon: FacebookIcon, 
      alt: 'Facebook',
      href: 'https://facebook.com'
    },
    { 
      id: 5, 
      icon: TwitterIcon, 
      alt: 'Twitter',
      href: 'https://twitter.com'
    }
  ];

  return (
    <div className="footer-web">
      <h2 className="footer-web-h2">Подписывайтесь на нас</h2>
      <ul className="footer-web-links">
        {socialLinks.map((item) => (
          <li key={item.id} className="footer-web-links__item">
            <a 
              href={item.href} 
              className="footer-web-links__link"
              target="_blank"
              rel="nofollow"
              aria-label={item.alt}
            >
              <img 
                src={item.icon} 
                alt={item.alt} 
                className="footer-web-links__icon" 
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FooterWeb;