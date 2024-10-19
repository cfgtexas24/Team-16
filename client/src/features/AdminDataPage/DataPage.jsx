import React, { useState } from 'react';
import AppLayout from "../../components/AppLayout";
import { Maximize2, Minimize2 } from 'lucide-react';

const graphs = [
    { id: 1, title: 'User Metrics', url: 'https://jpmc-team16.s3.us-east-2.amazonaws.com/Screenshot+2024-10-19+at+3.20.50%E2%80%AFAM.png', category: 'User' },
    { id: 2, url: 'https://jpmc-team16.s3.us-east-2.amazonaws.com/Screenshot+2024-10-19+at+3.20.11%E2%80%AFAM.png', category: 'User' },
    { id: 3, url: 'https://jpmc-team16.s3.us-east-2.amazonaws.com/Screenshot+2024-10-19+at+3.20.29%E2%80%AFAM.png', category: 'User' },
    { id: 4, title: 'Employer Metrics', url: 'https://jpmc-team16.s3.us-east-2.amazonaws.com/Screenshot+2024-10-19+at+3.21.38%E2%80%AFAM.png', category: 'Employer' },
    { id: 5, url: 'https://jpmc-team16.s3.us-east-2.amazonaws.com/Screenshot+2024-10-19+at+3.21.13%E2%80%AFAM.png', category: 'Employer' },
    { id: 6, title: 'Alumni Metrics', url: 'https://jpmc-team16.s3.us-east-2.amazonaws.com/Screenshot+2024-10-19+at+3.19.54%E2%80%AFAM.png', category: 'Alumni' },
];

const DataPage = () => {
    const [activeGraph, setActiveGraph] = useState(null);

    const handleGraphClick = (id) => {
        setActiveGraph(activeGraph === id ? null : id);
    };

    return (
        <AppLayout title="Metrics Dashboard">
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {graphs.map((graph) => (
                        <div
                            key={graph.id}
                            className={`relative graph-card ${activeGraph === graph.id ? 'enlarged' : ''}`}
                            onClick={() => handleGraphClick(graph.id)}
                        >
                            {graph.title && <p className="graph-title text-lg font-semibold text-gray-700">{graph.title}</p>}
                            <img 
                                src={graph.url} 
                                alt={graph.title || 'Graph image'} 
                                className="graph-image rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                            />
                            <div className="absolute top-3 right-3 icon-overlay">
                                {activeGraph === graph.id ? (
                                    <Minimize2 className="icon text-gray-500" />
                                ) : (
                                    <Maximize2 className="icon text-gray-500" />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
};

export default DataPage;