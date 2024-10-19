import React from 'react';

const Portfolio = ({ portfolio, sellStock, stocks }) => {
    const getLatestPrice = (stockName) => {
        const stock = stocks.find(s => s.name === stockName);
        return stock ? stock.price : 0;
    };

    const calculateTotalValue = () => {
        return portfolio.reduce((total, stock) => {
            const latestPrice = getLatestPrice(stock.name);
            return total + (latestPrice * stock.quantity);
        }, 0);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your Portfolio</h2>
            {portfolio.length > 0 ? (
                <>
                    <ul className="space-y-4 mb-4">
                        {portfolio.map(stock => {
                            const latestPrice = getLatestPrice(stock.name);
                            const profit = ((latestPrice - stock.price) * stock.quantity).toFixed(2);
                            const profitPercentage = (((latestPrice - stock.price) / stock.price) * 100).toFixed(2);
                            
                            return (
                                <li key={stock.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                                    <div>
                                        <span className="font-bold text-lg">{stock.name}</span>
                                        <span className="ml-2 text-gray-600">{stock.quantity} shares</span>
                                        <span className="ml-2 text-gray-600">@ ${parseFloat(latestPrice).toFixed(2)}</span>
                                        <div className={`text-sm ${parseFloat(profit) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                            Profit: ${profit} ({profitPercentage}%)
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => sellStock(stock.name)}
                                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                    >
                                        Sell
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="text-xl font-semibold text-gray-800">
                        Total Portfolio Value: ${calculateTotalValue().toFixed(2)}
                    </div>
                </>
            ) : (
                <p className="text-gray-600">No stocks in portfolio</p>
            )}
        </div>
    );
};

export default Portfolio;