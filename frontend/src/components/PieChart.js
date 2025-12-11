import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ expenses }) {
  const data = {
    labels: Object.keys(expenses),
    datasets: [{
      data: Object.values(expenses),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66BB6A', '#BA68C8', '#FFA726']
    }]
  };

  return (
    <div>
      <h3>Expense Breakdown</h3>
      <Pie data={data} />
    </div>
  );
}