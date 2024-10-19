import React, { useState } from 'react';
import './DataPage.css'; // Importing the CSS file
import AppLayout from "../../components/AppLayout";

const graphs = [
  { id: 1, title: 'User Metrics', url: 'https://jpmc-team16.s3.us-east-2.amazonaws.com/Screenshot+2024-10-19+at+3.20.50%E2%80%AFAM.png', category: 'User' },
  { id: 2, url: 'https://jpmc-team16.s3.us-east-2.amazonaws.com/Screenshot+2024-10-19+at+3.20.11%E2%80%AFAM.png', category: 'User' },
  { id: 3, url: 'https://jpmc-team16.s3.us-east-2.amazonaws.com/Screenshot+2024-10-19+at+3.20.29%E2%80%AFAM.png', category: 'User' },
  { id: 4, title: 'Employer Metrics', url: 'https://jpmc-team16.s3.us-east-2.amazonaws.com/Screenshot+2024-10-19+at+3.21.38%E2%80%AFAM.png', category: 'Employer' },
  { id: 5, url: 'https://jpmc-team16.s3.us-east-2.amazonaws.com/Screenshot+2024-10-19+at+3.21.13%E2%80%AFAM.png', category: 'Employer' },
  { id: 6, title: 'Alumni Metrics', url: 'https://jpmc-team16.s3.us-east-2.amazonaws.com/Screenshot+2024-10-19+at+3.19.54%E2%80%AFAM.png', category: 'Alumni' },
];

const DataPage = () => {
  const [activeGraph, setActiveGraph] = useState(null); // Track the active graph

  const handleGraphClick = (id) => {
    setActiveGraph(activeGraph === id ? null : id); // Toggle between enlarged and small
  };

  return (
    <AppLayout title="Metrics Dashboard">
    <div className="data-page">

      {/* Render the graphs vertically with the titles above */}
      <div className="graph-container">
        {graphs.map((graph) => (
          <div
            key={graph.id}
            className={`graph ${activeGraph === graph.id ? 'enlarged' : 'small'}`}
            onClick={() => handleGraphClick(graph.id)}
          >
            <p className="graph-title">{graph.title}</p>
            <img src={graph.url} alt={graph.title} className="graph-image" />
          </div>
        ))}
      </div>
    </div>
    </AppLayout>
  );
};

export default DataPage;