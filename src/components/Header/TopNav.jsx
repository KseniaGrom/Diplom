import React from 'react';
import { Link } from 'react-router-dom';
import './TopNav.css';

function TopNav() {
  const links = [
    { label: 'О нас', id: 'about' },
    { label: 'Как это работает', id: 'how-work' },
    { label: 'Отзывы', id: 'feedback' },
    { label: 'Контакты', id: 'footer' }
  ];

  return (
    <div className="top-nav">
      <div className="top-nav__container">
        <ul className="top-nav__links">
          {links.map((item) => (
            <li key={item.id}>
              <Link to={`/#${item.id}`} className="top-nav__link">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TopNav;