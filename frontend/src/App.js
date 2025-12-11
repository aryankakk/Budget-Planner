import React, { useState, useEffect } from 'react';
import BudgetForm from './components/BudgetForm';
import BudgetSummary from './components/BudgetSummary';
import ExpenseChart from './components/ExpenseChart';
import './App.css';

function generateRecommendations(result, expenses) {
  if (!result || !expenses || Object.keys(expenses).length === 0) return [];

  const { income, savings } = result;

  if (income === undefined || income === null || income <= 0) {
    return ["Unable to generate recommendations: income is missing or zero."];
  }

  const recs = [];
  const savingsRate = (savings / income) * 100;

  const expenseRates = Object.entries(expenses).map(([key, value]) => [
    key,
    (value / income) * 100,
  ]);

  if (savingsRate < 20) {
    recs.push(`Your savings rate is only ${savingsRate.toFixed(1)}%. Aim for at least 20%.`);
  } else {
    recs.push(`Great job! You're saving ${savingsRate.toFixed(1)}% of your income.`);
  }

  for (const [category, rate] of expenseRates) {
    if (category.toLowerCase() === 'rent' && rate > 30) {
      recs.push(`Your rent is ${rate.toFixed(1)}% of your income. Try to stay under 30%.`);
    }
    if (category.toLowerCase() === 'food' && rate > 15) {
      recs.push(`Food expenses are ${rate.toFixed(1)}%. Consider cooking more at home.`);
    }
    if (category.toLowerCase() === 'entertainment' && rate > 10) {
      recs.push(`Entertainment takes up ${rate.toFixed(1)}% of income. Look for free options.`);
    }
    if (category.toLowerCase() === 'utilities' && rate > 10) {
      recs.push(`Utilities are at ${rate.toFixed(1)}%. Check for ways to save energy.`);
    }
  }

  return recs;
}

function App() {
  const [result, setResult] = useState(null);
  const [expenses, setExpenses] = useState({});
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (result && Object.keys(expenses).length > 0) {
      setRecommendations(generateRecommendations(result, expenses));
    }
  }, [result, expenses]);

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">💰 Budget Planner</h1>

      <div className="max-w-3xl mx-auto bg-zinc-800 p-6 rounded-2xl shadow-md">
        <BudgetForm setResult={setResult} setExpenses={setExpenses} />
      </div>

      {result && (
        <div className="mt-10 w-full flex flex-col lg:flex-row lg:items-start gap-6">
          {/* LEFT: Summary + Recommendations */}
          <div className="lg:w-1/2 w-full space-y-6">
            <div className="bg-zinc-800 p-6 rounded-2xl shadow-md">
              <BudgetSummary result={result} />
            </div>
            <div className="bg-zinc-800 p-6 rounded-2xl shadow-md">
              <h2 className="text-xl font-semibold mb-4">💡 Recommendations</h2>
              <ul className="space-y-2 text-sm list-disc list-inside">
                {recommendations.map((rec, idx) => (
                  <li key={idx}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT: Chart */}
          <div className="lg:w-1/2 w-full bg-zinc-800 p-6 rounded-2xl shadow-md flex flex-col items-center justify-center">
            <h2 className="text-xl font-semibold mb-4">📉 Expense Breakdown</h2>
            <div className="w-full max-w-[300px]">
              <ExpenseChart expenses={expenses} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;