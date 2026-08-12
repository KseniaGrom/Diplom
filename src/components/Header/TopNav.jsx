import React from 'react';
import './TopNav.css';

function TopNav() {
  const links = ['О нас', 'Как это работает', 'Отзывы', 'Контакты'];
  
  return (
    <div className="top-nav">
      <div className="top-nav__container">
        <ul className="top-nav__links">
          {links.map((item) => (
            <li key={item}>
              <a href="#" className="top-nav__link">{item}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TopNav;