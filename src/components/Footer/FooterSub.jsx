import React, { useState } from 'react';
import './FooterSub.css';
import ButtonSub from './ButtonSub';
import FooterWeb from './FooterWeb';

function FooterSub() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (message) {
      setMessage('');
      setMessageType('');
    }
  };

  const handleSuccess = (msg) => {
    setMessage(msg);
    setMessageType('success');
    setEmail('');
  };

  const handleError = (msg) => {
    setMessage(msg);
    setMessageType('error');
  };

  return (
    <div className="footer-sub">
      <h2 className="footer-sub-h2">Подписка</h2>
      <form className="footer-sub-email" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="email" className="footer-sub-email-lable">
          Будьте в курсе событий
        </label>
        <div className="footer-sub-email-wrapper">
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="email"
            className="footer-sub-email-input"
            value={email}
            onChange={handleEmailChange}
          />
          <ButtonSub 
            email={email}
            onSuccess={handleSuccess}
            onError={handleError}
          />
        </div>
        {message && (
          <p className={`footer-sub-message footer-sub-message--${messageType}`}>
            {message}
          </p>
        )}
      </form>
      <FooterWeb />
    </div>
  );
}

export default FooterSub;