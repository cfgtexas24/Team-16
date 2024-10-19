import React, { useState, useEffect } from 'react';
import StockList from './StockList';
import Portfolio from './Portfolio';
import './stocks.css'

const App = () => {
    const [balance, setBalance] = useState(10000);
    const [stocks, setStocks] = useState([
        { name: "AAPL", price: generateRandomPrice(), quantity: 0 },
        { name: "GOOGL", price: generateRandomPrice(), quantity: 0 },
        { name: "AMZN", price: generateRandomPrice(), quantity: 0 },
        { name: "TSLA", price: generateRandomPrice(), quantity: 0 },
        { name: "MSFT", price: generateRandomPrice(), quantity: 0 }
    ]);
    const [portfolio, setPortfolio] = useState([]);

    useEffect(() => {
        const interval = setInterval(updateStockPrices, 5000);
        return () => clearInterval(interval);
    }, [stocks]);

    function generateRandomPrice() {
        return (Math.random() * 1000 + 50).toFixed(2);
    }

    const updateStockPrices = () => {
        setStocks(stocks.map(stock => ({
            ...stock,
            price: (parseFloat(stock.price) + (Math.random() * 10 - 5)).toFixed(2)
        })));
    };

    const buyStock = (stockName) => {
        const stock = stocks.find(s => s.name === stockName);
        if (balance >= stock.price) {
            setBalance(prevBalance => prevBalance - stock.price);

            const portfolioStock = portfolio.find(s => s.name === stock.name);
            if (portfolioStock) {
                setPortfolio(portfolio.map(s =>
                    s.name === stock.name ? { ...s, quantity: s.quantity + 1 } : s
                ));
            } else {
                setPortfolio([...portfolio, { name: stock.name, price: stock.price, quantity: 1 }]);
            }
        } else {
            alert("Not enough balance to buy this stock.");
        }
    };const sellStock = (stockName) => {
            const portfolioStock = portfolio.find(s => s.name === stockName);
            if (portfolioStock && portfolioStock.quantity > 0) {
                setBalance(prevBalance => prevBalance + parseFloat(portfolioStock.price));
    
                if (portfolioStock.quantity > 1) {
                    setPortfolio(portfolio.map(s =>
                        s.name === stockName ? { ...s, quantity: s.quantity - 1 } : s
                    ));
                } else {
                    setPortfolio(portfolio.filter(s => s.name !== stockName));
                }
            } else {
                alert("You don't own any shares of this stock.");
            }
        };
    
        return (
            <div className="App">
                <h1>Stock Market Simulator</h1>
                <div>Balance: ${balance.toFixed(2)}</div>
                <StockList stocks={stocks} buyStock={buyStock} />
                <Portfolio portfolio={portfolio} sellStock={sellStock} />
            </div>
        );
    };
    
    export default App;