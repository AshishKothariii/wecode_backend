import { useState, useEffect } from "react";
import axios from "axios";

const ProblemStatement = ({ problemId }) => {
  const [problemTitle, setProblemTitle] = useState("");
  const [problemStatement, setProblemStatement] = useState("");
  const [inputCases, setInputCases] = useState("");
  const [outputCases, setOutputCases] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProblemStatement = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/problem/${problemId}`,
          { withCredentials: true }
        );

        setProblemTitle(response.data.title);
        setProblemStatement(response.data.description);
        setInputCases(response.data.input_cases || "");
        setOutputCases(response.data.output_cases || "");
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProblemStatement();
  }, [problemId]);

  if (loading) {
    return (
      <div className="p-4 text-gray-600">Loading problem statement...</div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4 bg-gray-50 rounded-lg space-y-6">
      {/* Problem Title */}
      <h1 className="text-3xl font-bold text-gray-800 border-b-2 pb-2">
        {problemTitle}
      </h1>

      {/* Problem Statement */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <pre className="whitespace-pre-wrap font-sans text-gray-700">
          {problemStatement}
        </pre>
      </div>

      {/* Input/Output Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Cases */}
        {inputCases && (
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4 text-blue-600">Input</h2>
            <div className="bg-gray-50 p-4 rounded-md">
              <pre className="whitespace-pre-wrap font-mono text-sm text-gray-700">
                {inputCases}
              </pre>
            </div>
          </div>
        )}

        {/* Output Cases */}
        {outputCases && (
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4 text-green-600">
              Output
            </h2>
            <div className="bg-gray-50 p-4 rounded-md">
              <pre className="whitespace-pre-wrap font-mono text-sm text-gray-700">
                {outputCases}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemStatement;
