import React, { useState } from 'react';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const CoverLetterGenerator = () => {
    const [applicantName, setApplicantName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [skills, setSkills] = useState('');
    const [coverLetterResponse, setCoverLetterResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCoverLetterSubmit = async () => {
        if (!applicantName || !jobTitle || !companyName || !skills) {
            alert('Please fill in all fields.');
            return;
        }

        setLoading(true);
        setCoverLetterResponse('');

        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/client/coverLetter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ jobTitle, companyName, applicantName, skills })
            });

            if (!response.ok) {
                throw new Error('Failed to get a response from the server');
            }

            const data = await response.json();
            setCoverLetterResponse(data.coverLetter);
        } catch (error) {
            setCoverLetterResponse(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Cover Letter Generator</h2>
            <input
                type="text"
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                placeholder="Your Name"
                style={{ width: '100%', padding: '10px', margin: '10px' }}
                            />
                            <input
                                type="text"
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                                placeholder="Job Title"
                                style={{ width: '100%', padding: '10px', margin: '10px 0' }}
                            />
                            <input
                                type="text"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                placeholder="Company Name"
                                style={{ width: '100%', padding: '10px', margin: '10px 0' }}
                            />
                            <textarea
                                value={skills}
                                onChange={(e) => setSkills(e.target.value)}
                                placeholder="List your skills, separated by commas..."
                                rows="3"
                                style={{ width: '100%', padding: '10px', margin: '10px 0' }}
                            />
                            <button onClick={handleCoverLetterSubmit} disabled={loading}>
                                {loading ? 'Generating...' : 'Generate Cover Letter'}
                            </button>
                            {coverLetterResponse && (
                                <div style={{ marginTop: '20px' }}>
                                    <h3>Generated Cover Letter:</h3>
                                    <Markdown remarkPlugins={[remarkGfm]}>{coverLetterResponse}</Markdown>
                                </div>
                            )}
                        </div>
                    );
                };
                
                export default CoverLetterGenerator;