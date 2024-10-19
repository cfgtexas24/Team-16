import React, { useState } from 'react';
import { Send } from 'lucide-react';

const TrainingModule = () => {
    const videos = [
        {
            id: 1,
            title: "Guide to Retirement Plans",
            videoUrl: "https://www.youtube.com/embed/pZNnueqfj_A?si=HYaIS1btSrFC-ey7",
            question: "What is one of the key benefits of contributing to a traditional 401K plan?",
            options: [
                "You can withdraw funds at any age without penalty.",
                "Your contributions are taxed upfront, and withdrawals are tax-free.",
                "Your contributions lower your taxable income for the current year.",
                "You can invest in any stocks or bonds of your choosing."
            ],
            correctAnswer: "Your contributions lower your taxable income for the current year."
        },
        {
            id: 2,
            title: "How to Invest for Beginners",
            videoUrl: "https://www.youtube.com/embed/iCzBVWdNOeE?si=fZDcdBwaJdO-zEc2",
            question: "What is one of the key reasons why investing is better than keeping your money in a savings account?",
            options: [
                "Savings accounts offer higher returns than investments.",
                "Investing helps your money grow over time through compounding interest.",
                "You can withdraw your money from investments at any time without penalties.",
                "Savings accounts prevent inflation from decreasing your money's value."
            ],
            correctAnswer: "Investing helps your money grow over time through compounding interest."
        }
        // Add more videos and questions as needed
    ];

    const [userAnswers, setUserAnswers] = useState({});
    const [quizResults, setQuizResults] = useState({});

    const handleAnswerChange = (videoId, selectedOption) => {
        setUserAnswers({
            ...userAnswers,
            [videoId]: selectedOption
        });
    };

    const handleSubmit = (videoId, correctAnswer) => {
        const userAnswer = userAnswers[videoId];
        setQuizResults({
            ...quizResults,
            [videoId]: userAnswer === correctAnswer ? "Correct!" : "Wrong Answer."
        });
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-4xl font-bold mb-6 text-center" style={{ color: '#ffc107' }}>Training Module</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {videos.map((video) => (
                    <div key={video.id} className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold mb-4" style={{ color: '#ffc107' }}>{video.title}</h3>
                        <div className="mb-4">
                            <iframe
                                width="100%"
                                height="315"
                                src={video.videoUrl}
                                title={video.title}
                                frameBorder="0"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="mb-4">
                            <h4 className="font-semibold mb-2">{video.question}</h4>
                            {video.options.map((option) => (
                                <div key={option} className="mb-2">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name={`question-${video.id}`}
                                            value={option}
                                            onChange={() => handleAnswerChange(video.id, option)}
                                            checked={userAnswers[video.id] === option}
                                            className="form-radio text-yellow-500"
                                        />
                                        <span className="ml-2">{option}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => handleSubmit(video.id, video.correctAnswer)}
                            className="w-full py-2 px-4 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors flex items-center justify-center"
                        >
                            <Send className="mr-2" />
                            Submit Answer
                        </button>
                        {quizResults[video.id] && (
                            <div className="mt-4">
                                <p className={quizResults[video.id] === "Correct!" ? "text-green-500" : "text-red-500"}>
                                    {quizResults[video.id]}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrainingModule;