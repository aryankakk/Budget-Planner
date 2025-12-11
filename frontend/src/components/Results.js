export default function Results({ result }) {
    return (
      <div>
        <h2>📊 Budget Summary</h2>
        <p>Total Expenses: ${result.total_expense.toFixed(2)}</p>
        <p>Savings: ${result.savings.toFixed(2)}</p>
        <p>Savings Rate: {result.savings_percent}%</p>
        {result.warning && <p style={{ color: "red" }}>{result.warning}</p>}
      </div>
    );
  }