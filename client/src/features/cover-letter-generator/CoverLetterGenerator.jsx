import React, { useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { User, Briefcase, Building2, List, Send } from 'lucide-react';
import AppLayout from "../../components/AppLayout";

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

    const InputField = ({ icon: Icon, value, onChange, placeholder }) => (
        <div className="mb-4">
            <div className="flex items-center mb-2">
                <Icon className="text-yellow-500 mr-2" />
                <label className="text-lg font-semibold">{placeholder}</label>
            </div>
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
        </div>
    );

    return (
        <AppLayout title="Career Tools"> {/* Wrap the content in AppLayout */}
        <div className="container mx-auto p-4">
            <h2 className="text-4xl font-bold mb-6 text-center" style={{ color: '#ffc107' }}>Cover Letter Generator</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                <InputField
                    icon={User}
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="Your Name"
                />
                <InputField
                    icon={Briefcase}
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="Job Title"
                />
                <InputField
                    icon={Building2}
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Company Name"
                />
                <div className="mb-4">
                    <div className="flex items-center mb-2">
                        <List className="text-yellow-500 mr-2" />
                        <label className="text-lg font-semibold">Your Skills</label>
                    </div>
                    <textarea
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        placeholder="List your skills, separated by commas..."
                        rows="3"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                </div>
                <button 
                    onClick={handleCoverLetterSubmit} 
                    disabled={loading}
                    className="w-full py-2 px-4 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors flex items-center justify-center"
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating...
                        </>
                    ) : (
                        <>
                            <Send className="mr-2" />
                            Generate Cover Letter
                        </>
                    )}
                </button>
            </div>
            {coverLetterResponse && (
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-semibold mb-4" style={{ color: '#ffc107' }}>Generated Cover Letter:</h3>
                    <div className="prose max-w-none">
                        <Markdown remarkPlugins={[remarkGfm]}>{coverLetterResponse}</Markdown>
                    </div>
                </div>
            )}
        </div>
        </AppLayout>
    );
};

export default CoverLetterGenerator;