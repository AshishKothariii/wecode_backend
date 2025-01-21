import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProblemStatement from "../components/ProblemStatement";
import ProblemSubmissions from "../components/ProblemSubmissions";
import CodeEditor from "../components/CodeEditor";
import { useState } from "react";

const Statement = () => {
  const { id } = useParams();
  const [view, setView] = useState("problem");

  const handleSubmissionSuccess = () => {
    setView("submissions");
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 p-4">
        <div className="w-1/2 p-4 bg-gray-100 rounded-lg overflow-y-auto">
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => setView("problem")}
              className={`px-4 py-2 rounded ${
                view === "problem" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              Problem
            </button>
            <button
              onClick={() => setView("submissions")}
              className={`px-4 py-2 rounded ${
                view === "submissions"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Submissions
            </button>
          </div>
          {view === "problem" ? (
            <ProblemStatement problemId={id} />
          ) : (
            <ProblemSubmissions problemId={id} />
          )}
        </div>
        <CodeEditor
          problemId={id}
          onSubmissionSuccess={handleSubmissionSuccess}
        />
      </div>
    </div>
  );
};

export default Statement;
