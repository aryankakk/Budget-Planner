import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpenseChart({ expenses }) {
  const labels = Object.keys(expenses);
  const values = Object.values(expenses);

  const COLORS = ['#f87171', '#60a5fa', '#facc15', '#4ade80', '#a78bfa', '#fcd34d'];

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: COLORS,
        borderColor: '#1f2937', // matches dark bg
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'white',
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', maxWidth: 300, margin: '0 auto' }}>
      <Pie data={data} options={options} />
    </div>
  );
}