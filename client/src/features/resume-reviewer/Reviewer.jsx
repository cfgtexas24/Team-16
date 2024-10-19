import React, { useState } from 'react';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

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
        <div>
            <h2>Resume Reviewer</h2>
            <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume here..."
                rows="10"
                style={{ width: '100%', padding: '10px', fontSize: '16px' }}
            />
            <button onClick={handleReviewSubmit} disabled={loading}>
                {loading ? 'Reviewing...' : 'Review Resume'}
            </button>
            {reviewResponse && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Review Response:</h3>
                    {/* <p>{reviewResponse}</p> */}
                    <Markdown remarkPlugins={[remarkGfm]}>{reviewResponse}</Markdown>
                </div>
            )}
        </div>
    );
};

export default ResumeReviewer;