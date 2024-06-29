import React, { useState, useEffect, useRef } from 'react';
import ReactEcharts from 'echarts-for-react';
import axios from 'axios';
import styles from '../styles/Chart.module.css';

interface DataPoint {
  timestamp: string;
  value: number;
}

interface PieChartProps {
  timeframe: string;
}

const PieChart: React.FC<PieChartProps> = ({ timeframe }) => {
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

  const aggregateDataByTimeframe = (): { legendData: string[], seriesData: { value: number, name: string }[] } => {
    let legendData: string[] = [];
    let seriesData: { value: number, name: string }[] = [];

    if (timeframe === 'daily') {
      seriesData = data.map(item => ({ value: item.value, name: item.timestamp }));
      legendData = data.map(item => item.timestamp);
    } else if (timeframe === 'weekly') {
      const weeklyDataMap = new Map<string, number>();
      data.forEach(item => {
        const weekOfYear = getWeekOfYear(item.timestamp);
        const key = `Week ${weekOfYear}`;
        if (weeklyDataMap.has(key)) {
          weeklyDataMap.set(key, weeklyDataMap.get(key)! + item.value);
        } else {
          weeklyDataMap.set(key, item.value);
        }
      });
      weeklyDataMap.forEach((value, key) => {
        seriesData.push({ value, name: key });
        legendData.push(key);
      });
    } else if (timeframe === 'monthly') {
      const monthlyDataMap = new Map<string, number>();
      data.forEach(item => {
        const monthOfYear = new Date(item.timestamp).getMonth();
        const key = `${getMonthName(monthOfYear)} ${new Date(item.timestamp).getFullYear()}`;
        if (monthlyDataMap.has(key)) {
          monthlyDataMap.set(key, monthlyDataMap.get(key)! + item.value);
        } else {
          monthlyDataMap.set(key, item.value);
        }
      });
      monthlyDataMap.forEach((value, key) => {
        seriesData.push({ value, name: key });
        legendData.push(key);
      });
    }

    return { legendData, seriesData };
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
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    series: [
      {
        name: 'Pie Chart',
        type: 'pie',
        radius: ['45%', '80%'],
        avoidLabelOverlap: true,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '20',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: true,
        },
        data: aggregateDataByTimeframe().seriesData,
      },
    ],
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
    link.download = 'pie_chart.png';
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
      <button className={styles.chartButton} onClick={handleExport}>Export as PNG</button>
    </div>
  );
};

export default PieChart;
