import { useState, useEffect } from "react";
import axios from "axios";
import SubmissionDetail from "./SubmissionDetail";

const ProblemSubmissions = ({ problemId }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewSubmission, setViewSubmission] = useState(null);
  const submissionsPerPage = 10;
  const cleanUsername = (username) => {
    return username ? username.replace(/"/g, "") : username;
  };

  useEffect(() => {
    const fetchSubmissions = async () => {
      setLoadingSubmissions(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/submission/problem/${problemId}`,
          { withCredentials: true }
        );
        const sortedSubmissions = response.data.sort((a, b) =>
          b.submission_id.localeCompare(a.submission_id)
        );
        setSubmissions(sortedSubmissions);
      } catch (error) {
        console.error("Error fetching submissions:", error);
        setError("Failed to fetch submissions.");
      } finally {
        setLoadingSubmissions(false);
      }
    };

    fetchSubmissions();
  }, [problemId]);

  const indexOfLastSubmission = currentPage * submissionsPerPage;
  const indexOfFirstSubmission = indexOfLastSubmission - submissionsPerPage;
  const currentSubmissions = submissions.slice(
    indexOfFirstSubmission,
    indexOfLastSubmission
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSubmissionClick = (submission) => {
    setViewSubmission(submission);
  };

  const closeViewSubmission = () => {
    setViewSubmission(null);
  };

  if (loadingSubmissions) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
        {error}
      </div>
    );
  }

  return (
    <div className="relative">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Submission ID</th>
            <th className="p-2 border">User</th>
            <th className="p-2 border">Problem Name</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Language</th>
          </tr>
        </thead>
        <tbody>
          {currentSubmissions.map((submission, index) => (
            <tr key={index} className="border">
              <td className="p-2 border">
                <button
                  onClick={() => handleSubmissionClick(submission)}
                  style={{ color: "blue", textDecoration: "underline" }}
                  title={submission.submission_id}
                >
                  {submission.submission_id.substring(0, 6)}
                </button>
              </td>
              <td className="p-2 border">
                {cleanUsername(submission.username)}
              </td>
              <td className="p-2 border">{submission.problem_name}</td>
              <td className="p-2 border">
                <span
                  className={`px-2 py-1 rounded ${
                    submission.result === "Accepted"
                      ? "bg-green-100 text-green-800"
                      : submission.result === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {submission.result}
                </span>
              </td>
              <td className="p-2 border">{submission.language}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(submissions.length / submissionsPerPage) },
          (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`px-3 py-1 mx-1 rounded ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>

      <SubmissionDetail
        submission={viewSubmission}
        onClose={closeViewSubmission}
      />
    </div>
  );
};

export default ProblemSubmissions;
