'use client';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpenseChart({ data }: { data: { category: string; amount: number }[] }) {
  const chartData = {
    labels: data.map((item) => item.category),
    datasets: [
      {
        label: 'Expenses',
        data: data.map((item) => item.amount),
        backgroundColor: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b'],
      },
    ],
  };
  return <Pie data={chartData} />;
}