'use client'
import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import useSWR from 'swr';
import fetcher from '@/app/lib/fetcher';
import { Skeleton } from 'antd';

const DashboardPage = () => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  const { data: customers } = useSWR('/customer', fetcher);
  const { data: logs } = useSWR('/logs', fetcher);

  useEffect(() => {
    if (!customers || !logs || !chartRef.current) return;

    // ✅ Count log statuses
    const statusCounts = {
      calling: 0,
      busy: 0,
      waiting: 0,
      'not received': 0,
      'switched off': 0,
      denied: 0,
    };

    logs.forEach(log => {
      if (statusCounts[log.status] !== undefined) {
        statusCounts[log.status]++;
      }
    });

    // ✅ Chart data
    const data = {
      labels: ['Customers', ...Object.keys(statusCounts)],
      datasets: [
        {
          label: 'Count',
          data: [customers.length, ...Object.values(statusCounts)],
          backgroundColor: [
            '#4ade80', // green
            '#60a5fa', // blue
            '#facc15', // yellow
            '#f87171', // red
            '#a78bfa', // purple
            '#fbbf24', // orange
            '#34d399', // teal
          ],
        },
      ],
    };

    const config = {
      type: 'bar',
      data,
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: '📊 Dashboard Overview',
          },
        },
      },
    };

    // ✅ Destroy previous chart if exists
    if (chartInstance) {
      chartInstance.destroy();
    }

    const newChart = new Chart(chartRef.current.getContext('2d'), config);
    setChartInstance(newChart);

    // ✅ Cleanup on unmount
    return () => {
      newChart.destroy();
    };
  }, [customers, logs]);

  if (!customers || !logs) return <Skeleton active />

  return (
    <>
      <h1 className="text-2xl font-bold mb-2">📊 Dashboard</h1>
      <p className="mb-6">This is your dashboard overview.</p>
      <canvas ref={chartRef} />
    </>
  );
};

export default DashboardPage;
