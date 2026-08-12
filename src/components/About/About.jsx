import React from 'react';
import './About.css';

function About() {
  return (
    <section className="about-us">
      <div className="about-us__container">
        <h2 className="about-us__title">О НАС</h2>
        
        <div className="about-us__wrapper">
          <div className="about-us__bar"></div>
          
          <div className="about-us__text">
            <p>
              Мы рады видеть вас! Мы работаем для Вас с 2003 года. 
              14 лет мы наблюдаем, как с каждым днем все больше людей 
              заказывают жд билеты через интернет.
            </p>
            <p>
              Сегодня можно заказать железнодорожные билеты онлайн всего 
              в 2 клика, но стоит ли это делать? Мы расскажем о 
              преимуществах заказа через интернет.
            </p>
            <span className="about-us__highlight">
              Покупать жд билеты дешево можно за 90 суток до отправления поезда. 
              Благодаря динамическому ценообразованию цена на билеты в это 
              время самая низкая.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;