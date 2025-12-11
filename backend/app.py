from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/', methods=['GET'])
def home():
    return 'Backend is running!'

@app.route('/calculate', methods=['POST'])
def calculate_budget():
    data = request.get_json()
    income = data.get('income', 0)
    expenses = data.get('expenses', {})
    goal = data.get('goal', 0)

    total_expense = sum(expenses.values())
    savings = income - total_expense
    savings_percent = (savings / income) * 100 if income > 0 else 0
    warning = ""

    if savings < 0:
        warning = "You're spending more than your income!"
    elif savings_percent < 10:
        warning = f"You're only saving {savings_percent:.1f}% of your income. Try to save at least 20%."
    elif savings < goal:
        warning = f"You're saving ${savings:.2f}, but your goal is ${goal:.2f}."

    return jsonify({
        "total_expense": total_expense,
        "savings": savings,
        "savings_percent": round(savings_percent, 2),
        "warning": warning
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)