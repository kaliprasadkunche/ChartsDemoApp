import React, { useState, useEffect, useRef } from 'react';
import ReactEcharts from 'echarts-for-react';
import axios from 'axios';
import styles from '../styles/Chart.module.css';

interface DataPoint {
  timestamp: string;
  value: number;
}

interface ChartProps {
  timeframe: string; // Adjusted to accept 'daily', 'weekly', 'monthly'
}

const Chart: React.FC<ChartProps> = ({ timeframe }) => {
  const [data, setData] = useState<DataPoint[]>([]);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<DataPoint[]>('data.json');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const aggregateDataByTimeframe = (): { xAxisData: string[], seriesData: number[] } => {
    let xAxisData: string[] = [];
    let seriesData: number[] = [];

    if (timeframe === 'daily') {
      xAxisData = data.map(item => item.timestamp);
      seriesData = data.map(item => item.value);
    } else if (timeframe === 'weekly') {
      const weeklyDataMap = new Map<string, number>();
      data.forEach(item => {
        const weekOfYear = getWeekOfYear(item.timestamp);
        const key = `${weekOfYear}-${new Date(item.timestamp).getFullYear()}`;
        if (weeklyDataMap.has(key)) {
          weeklyDataMap.set(key, weeklyDataMap.get(key)! + item.value);
        } else {
          weeklyDataMap.set(key, item.value);
        }
      });
      weeklyDataMap.forEach((value, key) => {
        xAxisData.push(`Week ${key}`);
        seriesData.push(value);
      });
    } else if (timeframe === 'monthly') {
      const monthlyDataMap = new Map<string, number>();
      data.forEach(item => {
        const monthOfYear = new Date(item.timestamp).getMonth();
        const key = `${monthOfYear}-${new Date(item.timestamp).getFullYear()}`;
        if (monthlyDataMap.has(key)) {
          monthlyDataMap.set(key, monthlyDataMap.get(key)! + item.value);
        } else {
          monthlyDataMap.set(key, item.value);
        }
      });
      monthlyDataMap.forEach((value, key) => {
        const [monthIndex, year] = key.split('-');
        xAxisData.push(`${getMonthName(parseInt(monthIndex))} ${year}`);
        seriesData.push(value);
      });
    }

    return { xAxisData, seriesData };
  };

  const getWeekOfYear = (timestamp: string): string => {
    const date = new Date(timestamp);
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7).toString();
  };

  const getMonthName = (monthIndex: number): string => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[monthIndex];
  };

  const getOption = (): echarts.EChartsOption => ({
    xAxis: {
      type: 'category',
      data: aggregateDataByTimeframe().xAxisData,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: aggregateDataByTimeframe().seriesData,
        type: 'line',
        smooth: true
      },
    ],
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        const param = params[0];
        return `Date: ${param.name}<br />Value: ${param.value}`;
      },
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100,
      },
      {
        start: 0,
        end: 100,
      },
    ],
  });

  const handleChartClick = (params: any) => {
    alert(`Clicked: ${params.name} - ${params.value}`);
  };

  const handleExport = () => {
    const echartsInstance = chartRef.current.getEchartsInstance();
    const dataURL = echartsInstance.getDataURL({
      type: 'png',
      pixelRatio: 2,
      backgroundColor: '#fff',
    });

    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'chart.png';
    link.click();
  };

  return (
    <div className={styles.card}>
      <ReactEcharts
        ref={chartRef}
        option={getOption()}
        style={{ height: '300px', width: '100%' }}
        onEvents={{ click: handleChartClick }}
      />
      <button className={styles.chartButton} onClick={handleExport}>
        Export as PNG
      </button>
    </div>
  );
};

export default Chart;
