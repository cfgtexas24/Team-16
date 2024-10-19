import React, { useState } from 'react';
import { Send, Trash2 } from 'lucide-react';
import AppLayout from "../../components/AppLayout";

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
      <AppLayout title="Career Tools"> {/* Wrap the content in AppLayout */}
        <div className="container mx-auto p-4">
            <h2 className="text-4xl font-bold mb-6 text-center" style={{ color: '#ffc107' }}>Budget Game</h2>

            <div className="mb-6">
                <p className="text-lg">Weekly Income: <span className="font-semibold">${weeklyIncome}</span></p>
                <p className="text-lg">Total Savings: <span className="font-semibold">${totalSavings}</span></p>
                <p className="text-lg">Remaining Balance: <span className="font-semibold">${remainingBalance}</span></p>
            </div>

            {alert.show && (
                <div className={`mb-4 p-4 rounded-md ${alert.type === 'error' ? 'bg-red-100' : 'bg-green-100'}`}>
                    <h3 className={`font-bold ${alert.type === 'error' ? 'text-red-700' : 'text-green-700'}`}>
                        {alert.type === 'error' ? 'Error' : 'Success'}
                    </h3>
                    <p>{alert.message}</p>
                </div>
            )}
            <div className="mb-6 flex items-center">
                <input
                    type="text"
                    value={expenseName}
                    onChange={(e) => setExpenseName(e.target.value)}
                    placeholder="Expense name"
                    className="border p-2 mr-2 rounded-md w-1/3"
                />
                <input
                    type="number"
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                    placeholder="Expense amount"
                    className="border p-2 mr-2 rounded-md w-1/3"
                />
                <button
                    onClick={addExpense}
                    className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition-colors flex items-center"
                >
                    <Send className="mr-2" />
                    Add Expense
                </button>
            </div>

            <div>
                <h3 className="text-xl font-semibold mb-4" style={{ color: '#ffc107' }}>Expenses:</h3>
                <ul>
                    {expenses.map((expense, index) => (
                        <li key={index} className="flex justify-between items-center mb-4 p-2 border rounded-md shadow-md">
                            <span className="font-semibold">{expense.name}: ${expense.amount.toFixed(2)}</span>
                            <button
                                onClick={() => removeExpense(index)}
                                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors flex items-center"
                            >
                                <Trash2 className="mr-1" />
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        </AppLayout>
    );
};

export default BudgetGame;