import React, { useState } from 'react';
import './ButtonSub.css';
import { getSubcribe } from '../../api/api';

function ButtonSub({ email, onSuccess, onError }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email || !email.trim()) {
      if (onError) onError('Введите email');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return;
    }

    try {
      setIsLoading(true);
      const result = await getSubcribe(email.trim());
      console.log('Подписка оформлена:', result);
    } catch (error) {
      console.error('Ошибка подписки:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button className="buttonSub-button" onClick={handleSubscribe}>
      ОТПРАВИТЬ
    </button>
  );
}

export default ButtonSub;