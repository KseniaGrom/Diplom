import React from 'react';
import './FeedbackPeople.css';
import PeopleImg1 from '../../Images/Feedback/PeopleImg1.png';
import PeopleImg2 from '../../Images/Feedback/PeopleImg2.png';


function FeedbackPeople() {
  return (
    <div className="feedback-people">
        <div className="feedback-people__container">
            <div className="feedback-people__container__block">
                <div className="feedback-people__avatar">
                <img 
                    src={PeopleImg1} 
                    alt="" 
                    className="feedback-people-img" 
                />
                </div>
                <div className="feedback-people__textcontainer">
                    <h2 className="feedback-people__h2">Екатерина Вальнова</h2>
                    <div className="feedback-people__content">
                        <div className="feedback-people__marks">“</div>
                        <span className="feedback-people__text">
                        Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые.
                        <div className="feedback-people__marks feedback-people__marks--end">„</div>
                        </span>
                    </div>
                </div>
            </div>
            <div className="feedback-people__container__block">
                <div className="feedback-people__avatar">
                <img 
                    src={PeopleImg2} 
                    alt="" 
                    className="feedback-people-img" 
                />
                </div>
                <div className="feedback-people__textcontainer">
                    <h2 className="feedback-people__h2">Евгений Стрыкало</h2>
                    <div className="feedback-people__content">
                        <div className="feedback-people__marks">“</div>
                        <span className="feedback-people__text">
                        СМС-сопровождение до посадки <br/>
                        Сразу после оплаты ж/д билетов 
                        и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездке.
                        <div className="feedback-people__marks feedback-people__marks--end">„</div>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default FeedbackPeople;