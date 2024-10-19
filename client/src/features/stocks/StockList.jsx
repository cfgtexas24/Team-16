// src/components/StockList.js
import React from 'react';

const StockList = ({ stocks, buyStock }) => {
    return (
        <div className="stock-list">
            <h2>Available Stocks</h2>
            <ul>
                {stocks.map(stock => (
                    <li key={stock.name}>
                        {stock.name}: ${stock.price}
                        <button onClick={() => buyStock(stock.name)}>Buy</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StockList;