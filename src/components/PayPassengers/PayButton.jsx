import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PayButton.css';

function PayButton({ 
  passengerData, 
  ticket,
  adults, 
  children, 
  childrenWithoutSeat, 
  adultPrice, 
  childPrice,
  paymentMethod,
  onlineMethod
}) {
  const navigate = useNavigate();

  const getPassengerType = (data) => {
    if (data?.docType === 'Свидетельство о рождении') {
      return 'Детский';
    }
    return 'Взрослый';
  };

  const formatPassengersData = () => {
    if (!passengerData) return [];
    
    return Object.entries(passengerData).map(([index, data]) => {
      const type = getPassengerType(data);

      return {
        number: index,
        type: type,
        surname: data?.surname || '',
        name: data?.name || '',
        patronymic: data?.patronymic || '',
        gender: data?.gender || '',
        birthDate: data?.birthDate || '',
        docType: data?.docType || 'Паспорт РФ',
        series: data?.series || '',
        number: data?.number || '',
        phone: data?.phone || '',
        email: data?.email || '',
        limitedMobility: data?.limitedMobility || false
      };
    });
  };

  const calculateTotalPrice = () => {
    const adultTotal = adults * adultPrice;
    const childTotal = children * childPrice;
    return adultTotal + childTotal;
  };

  const handleClick = () => {
    const passengers = formatPassengersData();
    const totalPrice = calculateTotalPrice();

    console.log('📦 passengers с типами:', passengers);

    const checkoutData = {
      ticket: ticket,
      passengers: passengers,
      price: {
        adults: adults,
        children: children,
        childrenWithoutSeat: childrenWithoutSeat,
        adultPrice: adultPrice,
        childPrice: childPrice,
        totalPrice: totalPrice
      },
      payment: {
        method: paymentMethod,
        onlineMethod: onlineMethod
      }
    };

    navigate('/check', {
      state: checkoutData
    });
  };

  return (
    <button className="passengernextbutton" onClick={handleClick}>
      Купить билеты
    </button>
  );
}

export default PayButton;