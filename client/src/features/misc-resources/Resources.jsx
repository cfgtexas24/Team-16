import AppLayout from "../../components/AppLayout";

const LinksPage = () => {
  return (
    <AppLayout title="Resources">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Career Tools</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Stocks Game */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2"><span className="text-4xl">📈</span> Stocks Game</h2>
            <p className="text-gray-600 mb-4">
              A simulation game that lets you practice buying and selling stocks
              without the risk of real money.
            </p>
            <a href="/stocks" className="text-blue-600 hover:underline">
              Learn More
            </a>
          </div>

          {/* Card 2: Resume Reviewer */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2"><span className="text-4xl">📝</span> Resume Reviewer</h2>
            <p className="text-gray-600 mb-4">
              Upload your resume and receive automated feedback on how to
              improve it.
            </p>
            <a
              href="/resume-reviewer"
              className="text-blue-600 hover:underline"
            >
              Try It Out
            </a>
          </div>

          {/* Card 3: Resume Generator */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2"><span className="text-4xl">🛠️</span> Resume Generator</h2>
            <p className="text-gray-600 mb-4">
              Generate a professional-looking resume by filling out some basic
              information.
            </p>
            <a
              href="/resume-generator"
              className="text-blue-600 hover:underline"
            >
              Get Started
            </a>
          </div>

          {/* Card 4: Cover Letter Generator */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2"><span className="text-4xl">✉️</span> Cover Letter Generator</h2>
            <p className="text-gray-600 mb-4">
              Create a personalized cover letter tailored to your resume and job
              application.
            </p>
            <a
              href="/cover-letter-generator"
              className="text-blue-600 hover:underline"
            >
              Create Now
            </a>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default LinksPage;
