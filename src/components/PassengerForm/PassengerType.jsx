import React from 'react';
import CustomSelect from './CustomSelect';
import './PassengerType.css';

function PassengerType({ value, onChange }) {
  const options = ['Детский', 'Взрослый'];

  return (
    <div className="passenger-type">
      <CustomSelect
        options={options}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default PassengerType;