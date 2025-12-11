import React from 'react';

export default function BudgetSummary({ result }) {
  if (!result) return null;

  const { totalExpenses, savings, savingsRate, savingsGoal } = result;

  // Safely check for null or undefined values
  const formattedExpenses = typeof totalExpenses === 'number' ? totalExpenses.toFixed(2) : 'N/A';
  const formattedSavings = typeof savings === 'number' ? savings.toFixed(2) : 'N/A';
  const formattedRate = typeof savingsRate === 'number' ? (savingsRate * 100).toFixed(1) : 'N/A';
  const formattedGoal = typeof savingsGoal === 'number' ? savingsGoal.toFixed(2) : null;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">📊 Budget Summary</h2>
      <p><strong>Total Expenses:</strong> ${formattedExpenses}</p>
      <p><strong>Savings:</strong> ${formattedSavings}</p>
      <p><strong>Savings Rate:</strong> {formattedRate}%</p>
      {formattedGoal !== null && savings < savingsGoal && (
        <p className="text-red-400 mt-2">
          ⚠️ You're saving ${formattedSavings}, but your goal is ${formattedGoal}.
        </p>
      )}
    </div>
  );
}