import { useEffect, useState } from "react";
import axios from "axios";

const SubmissionDetail = ({ submission, onClose }) => {
  const [detailedSubmission, setDetailedSubmission] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const formatDateToIST = (createdAt) => {
    const date = new Date(createdAt);

    // Format time with AM/PM
    const time = date.toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    // Format date
    const formattedDate = date.toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    return `${time} ${formattedDate}`;
  };
  useEffect(() => {
    if (submission) {
      setLoading(true);
      axios
        .get(`/api/submission/${submission.submission_id}`, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);
          setDetailedSubmission(response.data);
          setError(null);
        })
        .catch((err) => {
          setError("Failed to fetch submission details.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [submission]);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
  };

  if (!submission) return null;

  const cleanUsername = (username) => {
    return username ? username.replace(/"/g, "") : username;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="bg-white w-4/5 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg overflow-hidden"
        style={{ maxHeight: "90vh" }}
      >
        {/* Header */}
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold">Submission Details</h2>
          <button className="text-red-500 font-bold text-lg" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-4 overflow-y-auto" style={{ maxHeight: "75vh" }}>
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-8 py-2 rounded">
              {error}
            </div>
          ) : detailedSubmission ? (
            <>
              <div className="grid grid-cols-2">
                <div className="text-md font-medium  mb-2">
                  User: {cleanUsername(detailedSubmission.username)}
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="text-md font-medium mb-2">
                  Language: {detailedSubmission.language}
                </div>
                <div className="text-md font-medium  mb-2">
                  Status: {detailedSubmission.result}
                  {detailedSubmission.result === "accepted" ? (
                    ""
                  ) : (
                    <div>
                      At {detailedSubmission.test_cases_passed + 1} Case
                    </div>
                  )}
                </div>
              </div>

              <h3 className="text-md font-medium mt-4 mb-2">Code:</h3>
              <div className="p-4 rounded">
                <button
                  className="mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => handleCopyCode(detailedSubmission.code || "")}
                >
                  Copy Code
                </button>

                <pre className="text-sm">
                  {detailedSubmission.code || "No code available"}
                </pre>
              </div>
            </>
          ) : (
            <p>No submission details available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetail;
