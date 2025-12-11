import React, { useState } from 'react';
import axios from 'axios';

const categories = ['Rent', 'Food', 'Transport', 'Utilities', 'Entertainment', 'Other'];

export default function BudgetForm({ setResult, setExpenses }) {
  const [income, setIncome] = useState('');
  const [goal, setGoal] = useState('');
  const [expenseInputs, setExpenseInputs] = useState({});

  const handleChange = (e, cat) => {
    setExpenseInputs({ ...expenseInputs, [cat]: parseFloat(e.target.value) || 0 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const incomeVal = parseFloat(income);
    const goalVal = parseFloat(goal);
    const totalExpenses = Object.values(expenseInputs).reduce((sum, val) => sum + val, 0);
    const savings = incomeVal - totalExpenses;
    const savingsRate = incomeVal !== 0 ? savings / incomeVal : 0;
  
    setResult({
      income: incomeVal,
      expenses: expenseInputs,
      totalExpenses: totalExpenses,
      savings: savings,
      savingsRate: savingsRate,
      savingsGoal: goalVal,
    });
  
    setExpenses(expenseInputs);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Monthly Income: $<input type="number" value={income} onChange={e => setIncome(e.target.value)} /></label>
      <br />
      {categories.map(cat => (
        <div key={cat}>
          <label>{cat}: $<input type="number" onChange={(e) => handleChange(e, cat)} /></label>
        </div>
      ))}
      <br />
      <label>Savings Goal: $<input type="number" value={goal} onChange={e => setGoal(e.target.value)} /></label>
      <br /><br />
      <button type="submit">Calculate</button>
    </form>
  );
}