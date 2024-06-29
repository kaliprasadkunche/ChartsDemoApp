import React, { useState } from 'react';
import Chart from './components/Chart';
import TimeframeSelector from './components/TimeframeSelector';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import ScatterChart from './components/ScatterChart';
import styles from './styles/Chart.module.css';

const App: React.FC = () => {
  const [timeframe, setTimeframe] = useState<string>('daily');

  const handleTimeframeSelect = (selectedTimeframe: string) => {
    setTimeframe(selectedTimeframe);
  };

  return (
    <div className={styles.appContainer}>
      <h1 className={styles.title}>Chart Analysis</h1>
      <TimeframeSelector selectedTimeframe={timeframe} onSelect={handleTimeframeSelect} />

      <div className={styles.chartRow}>
        <div className={styles.chartItem}>
          <Chart timeframe={timeframe} />
        </div>
        <div className={styles.chartItem}>
          <BarChart timeframe={timeframe} />
        </div>
      </div>

      <div className={styles.chartRow}>
        <div className={styles.chartItem}>
          <PieChart timeframe={timeframe} />
        </div>
        <div className={styles.chartItem}>
          <ScatterChart timeframe={timeframe} />
        </div>
      </div>
    </div>
  );
};

export default App;
