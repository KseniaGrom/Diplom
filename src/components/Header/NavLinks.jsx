import React from 'react';
import './NavLinks.css';

function NavLinks() {
  const links = ['О нас', 'Как это работает', 'Отзывы', 'Контакты'];
  
  return (
    <ul className="nav-links">
      {links.map((item) => (
        <li key={item}>
          <a href="#" className="nav-links__item">{item}</a>
        </li>
      ))}
    </ul>
  );
}

export default NavLinks;