import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart({ data }) {
  const chartData = {
    labels: data?.labels || ["M", "T", "W", "T", "F", "S", "S"],
    datasets: [
      {
        label: 'Views',
        data: data?.values || [50, 45, 22, 28, 50, 60, 76],
        backgroundColor: '#43A047',
        borderRadius: 4,
        borderSkipped: false,
        barThickness: 'flex',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    scales: {
      y: {
        grid: {
          drawBorder: false,
          display: true,
          drawOnChartArea: true,
          drawTicks: false,
          borderDash: [5, 5],
          color: '#e5e5e5',
        },
        ticks: {
          suggestedMin: 0,
          suggestedMax: 500,
          beginAtZero: true,
          padding: 10,
          font: {
            size: 14,
            lineHeight: 2,
          },
          color: '#737373',
        },
      },
      x: {
        grid: {
          drawBorder: false,
          display: false,
          drawOnChartArea: false,
          drawTicks: false,
          borderDash: [5, 5],
        },
        ticks: {
          display: true,
          color: '#737373',
          padding: 10,
          font: {
            size: 14,
            lineHeight: 2,
          },
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}

export default BarChart;
