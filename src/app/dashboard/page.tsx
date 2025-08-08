'use client';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function Dashboard() {
  const { data: session } = useSession();
  const [insights, setInsights] = useState<string[]>([]);

  const handleGetInsights = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ income: 500, expenses: 300 }),
      });
      if (!res.ok) throw new Error('Failed to fetch insights');
      const data = await res.json();
      setInsights(data.suggestions);
    } catch (error) {
      console.error(error);
    }
  };

  if (!session) return <p>Please sign in.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <button onClick={handleGetInsights} className="bg-blue-500 text-white p-2 mt-4">
        Get Financial Insights
      </button>
      <ul className="mt-4">
        {insights.map((tip, index) => (
          <li key={index} className="text-gray-700">{tip}</li>
        ))}
      </ul>
    </div>
  );
}