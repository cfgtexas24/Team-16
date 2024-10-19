const LinksPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Career Tools</h1>
      <ul className="space-y-4">
        <li>
          <a href="/stocks" className="text-blue-600 hover:underline">Stocks Game</a>
        </li>
        <li>
          <a href="/resume-reviewer" className="text-blue-600 hover:underline">Resume Reviewer</a>
        </li>
        <li>
          <a href="/resume-generator" className="text-blue-600 hover:underline">Resume Generator</a>
        </li>
        <li>
          <a href="/cover-letter-generator" className="text-blue-600 hover:underline">Cover Letter Generator</a>
        </li>
      </ul>
    </div>
  );
};

export default LinksPage;