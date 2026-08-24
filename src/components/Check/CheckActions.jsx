import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendOrder } from '../../api/api';
import './CheckActions.css';

function CheckActions({
  onConfirm,
  ticket,
  passengers,
  price,
  payment
}) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getPassengerName = () => {
    if (passengers && passengers.length > 0) {
      const firstPassenger = passengers[0];
      return `${firstPassenger.name || ''} ${firstPassenger.patronymic || ''}`.trim() || 'Уважаемый пассажир';
    }
    return 'Уважаемый пассажир';
  };

  const passengerName = getPassengerName();
  const totalPrice = price?.totalPrice || 0;

  const buildOrderData = () => {
    const orderData = {
      ticket: ticket?._id || ticket?.id,
      passengers: passengers?.map(p => ({
        first_name: p.name || '',
        last_name: p.surname || '',
        patronymic: p.patronymic || '',
        document_type: p.documentType || 'passport',
        document_number: p.documentNumber || '',
        birthday: p.birthday || '',
        gender: p.gender || 'male'
      })) || [],
      seats: passengers?.map(p => ({
        wagon_id: p.wagonId || '',
        seat_number: p.seatNumber || 0
      })) || [],
      payment: {
        method: payment?.method || 'card',
        amount: totalPrice
      },
      price: totalPrice
    };

    return orderData;
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const orderData = buildOrderData();

      const result = await sendOrder(JSON.stringify(orderData));

      if (onConfirm) {
        onConfirm();
      }

      navigate('/final', {
        state: {
          totalPrice: totalPrice,
          passengerName: passengerName,
          passengerData: passengers,
          ticket: ticket,
          payment: payment,
          price: price,
          orderResult: result
        }
      });

    } catch (err) {
      console.error('❌ Ошибка отправки заказа:', err);
      setError('Не удалось отправить заказ. Пожалуйста, попробуйте снова.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="check-actions">
      {error && (
        <div className="check-actions__error">
          {error}
        </div>
      )}
      <button
        className="check-actions__button check-actions__button--confirm"
        onClick={handleConfirm}
        disabled={isLoading}
      >
        {isLoading ? 'Отправка...' : 'Подтвердить'}
      </button>
    </div>
  );
}

export default CheckActions;