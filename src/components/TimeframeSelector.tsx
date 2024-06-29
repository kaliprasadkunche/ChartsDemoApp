import React from 'react';
import styles from '../styles/Chart.module.css';

interface TimeframeSelectorProps {
  selectedTimeframe: string;
  onSelect: (timeframe: string) => void;
}

const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({ selectedTimeframe, onSelect }) => {
  const buttonStyle = (timeframe: string) =>
    timeframe === selectedTimeframe ? `${styles.chartButton} ${styles.selected}` : styles.chartButton;

  const handleClick = (timeframe: string) => {
    onSelect(timeframe);
  };

  return (
    <div>
      <button
        className={buttonStyle('daily')}
        onClick={() => handleClick('daily')}
        style={{ backgroundColor: selectedTimeframe === 'daily' ? '#45a3f5' : '#e6ebe7' }}
      >
        Day
      </button>
      <button
        className={buttonStyle('weekly')}
        onClick={() => handleClick('weekly')}
        style={{ backgroundColor: selectedTimeframe === 'weekly' ? '#45a3f5' : '#e6ebe7' }}
      >
        Week
      </button>
      <button
        className={buttonStyle('monthly')}
        onClick={() => handleClick('monthly')}
        style={{ backgroundColor: selectedTimeframe === 'monthly' ? '#45a3f5' : '#e6ebe7' }}
      >
        Month
      </button>
    </div>
  );
};

export default TimeframeSelector;
