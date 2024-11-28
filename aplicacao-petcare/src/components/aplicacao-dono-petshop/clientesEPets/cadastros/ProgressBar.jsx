import React from 'react';
import styles from './ProgressBar.module.css';

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className={styles.progressBarContainer}>
      <div
        className={styles.progressBar}
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
