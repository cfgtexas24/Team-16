import React, { useState, useEffect } from 'react';
import { ArrowUpCircle, ArrowDownCircle, DollarSign } from 'lucide-react';
import StockList from './StockList';
import Portfolio from './Portfolio';

// Custom Alert component
const Alert = ({ type, message }) => (
    <div className={`p-4 mb-4 rounded-md ${type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
        <p className="font-bold">{type === 'error' ? 'Error' : 'Success'}</p>
        <p>{message}</p>
    </div>
);

const App = () => {
    const [balance, setBalance] = useState(10000);
    const [stocks, setStocks] = useState([
        { name: "AAPL", price: generateRandomPrice(), change: 0 },
        { name: "GOOGL", price: generateRandomPrice(), change: 0 },
        { name: "AMZN", price: generateRandomPrice(), change: 0 },
        { name: "TSLA", price: generateRandomPrice(), change: 0 },
        { name: "MSFT", price: generateRandomPrice(), change: 0 }
    ]);
    const [portfolio, setPortfolio] = useState([]);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        const interval = setInterval(updateStockPrices, 5000);
        return () => clearInterval(interval);
    }, [stocks]);

    function generateRandomPrice() {
        return (Math.random() * 1000 + 50).toFixed(2);
    }

    const updateStockPrices = () => {
        setStocks(stocks.map(stock => {
            const change = (Math.random() * 10 - 5).toFixed(2);
            const newPrice = (parseFloat(stock.price) + parseFloat(change)).toFixed(2);
            return {
                ...stock,
                price: newPrice,
                change: change
            };
        }));
    };

    const buyStock = (stockName) => {
        const stock = stocks.find(s => s.name === stockName);
        if (balance >= stock.price) {
            setBalance(prevBalance => (prevBalance - stock.price).toFixed(2));

            const portfolioStock = portfolio.find(s => s.name === stock.name);
            if (portfolioStock) {
                setPortfolio(portfolio.map(s =>
                    s.name === stock.name ? { ...s, quantity: s.quantity + 1 } : s
                ));
            } else {
                setPortfolio([...portfolio, { name: stock.name, price: stock.price, quantity: 1 }]);
            }
            setNotification({ type: 'success', message: `Successfully bought 1 share of ${stockName}` });
        } else {
            setNotification({ type: 'error', message: "Not enough balance to buy this stock." });
        }
    };

    const sellStock = (stockName) => {
        const portfolioStock = portfolio.find(s => s.name === stockName);
        if (portfolioStock && portfolioStock.quantity > 0) {
            setBalance(prevBalance => (parseFloat(prevBalance) + parseFloat(portfolioStock.price)).toFixed(2));

            if (portfolioStock.quantity > 1) {
                setPortfolio(portfolio.map(s =>
                    s.name === stockName ? { ...s, quantity: s.quantity - 1 } : s
                ));
            } else {
                setPortfolio(portfolio.filter(s => s.name !== stockName));
            }
            setNotification({ type: 'success', message: `Successfully sold 1 share of ${stockName}` });
        } else {
            setNotification({ type: 'error', message: "You don't own any shares of this stock." });
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-6 text-center" style={{ color: '#ffc107' }}>Stock Market Simulator</h1>
            <div className="flex items-center justify-center mb-6">
                <DollarSign className="text-green-500 mr-2" />
                <span className="text-2xl font-semibold">Balance: ${parseFloat(balance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            {notification && (
                <Alert type={notification.type} message={notification.message} />
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StockList stocks={stocks} buyStock={buyStock} />
                <Portfolio portfolio={portfolio} sellStock={sellStock} stocks={stocks} />
            </div>
        </div>
    );
};

export default App;
