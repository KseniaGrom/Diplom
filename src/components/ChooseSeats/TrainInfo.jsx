import React from 'react';
import './TrainInfo.css';
import ChangeTrainButton from './ChangeTrainButton';
import arrowIcon from '../../Images/Btninfo.png';
import TrainInfoRow from './TrainInfoRow';

function TrainInfo({ ticket }) {
  return (
    <div className="train-info">
      <div className="train-info__change-wrapper">
        <img src={arrowIcon} alt="←" className="train-info-btn__icon" />
        <ChangeTrainButton />
      </div>
      <TrainInfoRow ticket={ticket} />
    </div>
  );
}

export default TrainInfo;