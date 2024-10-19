// src/components/Portfolio.js
import React from 'react';

const Portfolio = ({ portfolio, sellStock }) => {
    return (
        <div className="portfolio">
            <h2>Your Portfolio</h2>
            <ul>
                {portfolio.length > 0 ? portfolio.map(stock => (
                    <li key={stock.name}>
                        {stock.name}: {stock.quantity} shares @ ${stock.price} each
                        <button onClick={() => sellStock(stock.name)}>Sell</button>
                    </li>
                )) : <li>No stocks in portfolio</li>}
            </ul>
        </div>
    );
};

export default Portfolio;