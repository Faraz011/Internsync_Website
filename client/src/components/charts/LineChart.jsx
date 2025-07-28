import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart({ data, type = 'sales' }) {
  const chartData = {
    labels: data?.labels || (type === 'sales' 
      ? ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"]
      : ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    ),
    datasets: [
      {
        label: type === 'sales' ? 'Sales' : 'Tasks',
        data: data?.values || (type === 'sales' 
          ? [120, 230, 130, 440, 250, 360, 270, 180, 90, 300, 310, 220]
          : [50, 40, 300, 220, 500, 250, 400, 230, 500]
        ),
        tension: 0,
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: '#43A047',
        pointBorderColor: 'transparent',
        borderColor: '#43A047',
        backgroundColor: 'transparent',
        fill: true,
        maxBarThickness: 6,
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
      tooltip: type === 'sales' ? {
        callbacks: {
          title: function(context) {
            const fullMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            return fullMonths[context[0].dataIndex];
          }
        }
      } : {},
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
          borderDash: [4, 4],
          color: '#e5e5e5',
        },
        ticks: {
          display: true,
          color: '#737373',
          padding: 10,
          font: {
            size: 12,
            lineHeight: 2,
          },
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
            size: 12,
            lineHeight: 2,
          },
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}

export default LineChart;
