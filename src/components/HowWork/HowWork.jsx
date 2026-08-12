import React from 'react';
import HowButton from './HowButton';
import HowReasons from './HowReasons';
import './HowWork.css';

function HowWork() {
  return (
      <section className = "how-it-work">
        <div className="how-it-works__container">
          <h2 className="how-it-wotk__h2">КАК ЭТО РАБОТАЕТ</h2>
          <HowButton />
        </div>
        <HowReasons />
      </section>
  );
}

export default HowWork;