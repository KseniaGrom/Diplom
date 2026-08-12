import React from 'react';
import './Feedback.css';
import FeedbackPeople from './FeedbackPeople';
import FeedbackPoint from './FeedbackPoint';

function Feedback() {
  return (
    <section className="feedback">
      <div className="feedback__container">
        <h2 className="feedback__title">Отзывы</h2>
        <FeedbackPeople />
        <FeedbackPoint />

      </div>
    </section>
  );
}

export default Feedback;