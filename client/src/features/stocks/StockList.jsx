import React from 'react';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

const StockList = ({ stocks, buyStock }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Available Stocks</h2>
            <ul className="space-y-4">
                {stocks.map(stock => (
                    <li key={stock.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <div>
                            <span className="font-bold text-lg">{stock.name}</span>
                            <span className="ml-2 text-gray-600">${parseFloat(stock.price).toFixed(2)}</span>
                            <span className={`ml-2 ${parseFloat(stock.change) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {parseFloat(stock.change) >= 0 ? <ArrowUpCircle className="inline mr-1" size={16} /> : <ArrowDownCircle className="inline mr-1" size={16} />}
                                {Math.abs(parseFloat(stock.change)).toFixed(2)}
                            </span>
                        </div>
                        <button 
                            onClick={() => buyStock(stock.name)}
                            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                        >
                            Buy
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StockList;
