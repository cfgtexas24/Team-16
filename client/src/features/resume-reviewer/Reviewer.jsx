import React, { useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FileText, Send } from 'lucide-react';
import AppLayout from "../../components/AppLayout";

const ResumeReviewer = () => {
    const [resumeText, setResumeText] = useState('');
    const [reviewResponse, setReviewResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleReviewSubmit = async () => {
        if (!resumeText) {
            alert('Please enter your resume text.');
            return;
        }
        setLoading(true);
        setReviewResponse('');
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/client/reviewResume', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ resumeText })
            });
            if (!response.ok) {
                throw new Error('Failed to get a response from the server');
            }
            const data = await response.json();
            setReviewResponse(data.review);
        } catch (error) {
            setReviewResponse(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AppLayout title="Career Tools"> {/* Wrap the content in AppLayout */}
        <div className="container mx-auto p-4">
            <h2 className="text-4xl font-bold mb-6 text-center" style={{ color: '#ffc107' }}>Resume Reviewer</h2>
            <div className="mb-6">
                <div className="flex items-center mb-2">
                    <FileText className="text-yellow-500 mr-2" />
                    <label className="text-lg font-semibold">Your Resume</label>
                </div>
                <textarea
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="Paste your resume here..."
                    rows="10"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
            </div>
            <button 
                onClick={handleReviewSubmit} 
                disabled={loading}
                className="w-full py-2 px-4 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors flex items-center justify-center"
            >
                {loading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Reviewing...
                    </>
                ) : (
                    <>
                        <Send className="mr-2" />
                        Review Resume
                    </>
                )}
            </button>
            {reviewResponse && (
                <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-semibold mb-4" style={{ color: '#ffc107' }}>Review Response:</h3>
                    <div className="prose max-w-none">
                        <Markdown remarkPlugins={[remarkGfm]}>{reviewResponse}</Markdown>
                    </div>
                </div>
            )}
        </div>
        </AppLayout>
    );
};

export default ResumeReviewer;