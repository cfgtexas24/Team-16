import React, { useState } from 'react';

const BudgetGame = () => {
  const [weeklyIncome] = useState(500);
  const [totalSavings, setTotalSavings] = useState(0);
  const [remainingBalance, setRemainingBalance] = useState(weeklyIncome);
  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [alert, setAlert] = useState({ show: false, message: '', type: 'error' });

  const addExpense = () => {
    const amount = parseFloat(expenseAmount);
    if (expenseName && amount > 0) {
      if (amount <= remainingBalance) {
        const newExpenses = [...expenses, { name: expenseName, amount }];
        setExpenses(newExpenses);
        updateBudget(newExpenses);
        setExpenseName('');
        setExpenseAmount('');
        setAlert({ show: false, message: '', type: 'error' });
      } else {
        setAlert({ 
          show: true, 
          message: `This expense of $${amount} exceeds your remaining balance of $${remainingBalance}.`,
          type: 'error'
        });
      }
    } else {
      setAlert({ 
        show: true, 
        message: "Please enter a valid expense name and amount.",
        type: 'error'
      });
    }
  };

  const removeExpense = (index) => {
    const newExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(newExpenses);
    updateBudget(newExpenses);
    setAlert({
      show: true,
      message: "Expense removed successfully.",
      type: 'success'
    });
  };

  const updateBudget = (newExpenses) => {
    const totalExpenses = newExpenses.reduce((acc, curr) => acc + curr.amount, 0);
    setTotalSavings(weeklyIncome - totalExpenses);
    setRemainingBalance(weeklyIncome - totalExpenses);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Budget Game</h1>
      <div className="mb-4">
        <p>Weekly Income: ${weeklyIncome}</p>
        <p>Total Savings: ${totalSavings}</p>
        <p>Remaining Balance: ${remainingBalance}</p>
      </div>
      {alert.show && (
        <div variant={alert.type === 'error' ? "destructive" : "default"} className="mb-4">
          <h3>{alert.type === 'error' ? 'Error' : 'Success'}</h3>
          <p>{alert.message}</p>
        </div>
      )}
      <div className="mb-4">
        <input
          type="text"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
          placeholder="Expense name"
          className="border p-2 mr-2"
        />
        <input
          type="number"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
          placeholder="Expense amount"
          className="border p-2 mr-2"
        />
        <button onClick={addExpense} className="bg-blue-500 text-white p-2 rounded">
          Add Expense
        </button>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Expenses:</h2>
        <ul>
          {expenses.map((expense, index) => (
            <li key={index} className="flex items-center justify-between mb-2">
              <span>{expense.name}: ${expense.amount}</span>
              <button 
                onClick={() => removeExpense(index)} 
                className="bg-red-500 text-white p-2 rounded flex items-center"
              >
                 Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BudgetGame;