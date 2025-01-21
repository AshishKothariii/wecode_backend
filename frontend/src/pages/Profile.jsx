import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import SubmissionDetail from "../components/SubmissionDetail";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewSubmission, setViewSubmission] = useState(null);

  const username = localStorage.getItem("user");
  const handleSubmissionClick = (submission) => {
    setViewSubmission(submission);
  };

  // Close detail view
  const closeViewSubmission = () => {
    setViewSubmission(null);
  };
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
    const fetchProfileData = async () => {
      try {
        const userResponse = await axios.get("http://localhost:3000/user", {
          withCredentials: true,
        });

        const submissionResponse = await axios.get(
          `http://localhost:3000/submission/user/${username}`,
          { withCredentials: true }
        );
        setProfileData({
          username: userResponse.data.name,
          email: userResponse.data.email,
          solvedProblems: userResponse.data.accepted_count,
          profilePicture:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        });

        setSubmissions(submissionResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [username]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1 style={{ color: "red" }}>{error}</h1>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Navbar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Profile Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "600px",
            padding: "20px",
            background: "#f9f9f9",
            borderRadius: "8px",
            marginTop: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={profileData.profilePicture}
              alt={profileData.username}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                marginRight: "20px",
              }}
            />
            <div>
              <h2>{profileData.username}</h2>
              <p>
                <strong>Email:</strong> {profileData.email}
              </p>
            </div>
          </div>
          <div>
            <p>
              <strong>Problems Solved:</strong> {profileData.solvedProblems}
            </p>
          </div>
        </div>

        {/* Submissions Section */}
        <div style={{ width: "100%", maxWidth: "600px", marginTop: "20px" }}>
          <h3>My Submissions</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  Submission Id
                </th>
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  Problem
                </th>
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  Status
                </th>
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  Language
                </th>
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  Submitted At
                </th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission, index) => (
                <tr key={index} style={{ border: "1px solid #ddd" }}>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    <button
                      onClick={() => handleSubmissionClick(submission)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "blue",
                        textDecoration: "underline",
                        cursor: "pointer",
                        padding: 0,
                      }}
                    >
                      {submission.submission_id.slice(12, 24)}
                    </button>
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {submission.problem_name}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {submission.result}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {submission.language}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {formatDateToIST(submission.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {viewSubmission && (
        <SubmissionDetail
          submission={viewSubmission}
          onClose={closeViewSubmission}
        />
      )}
    </div>
  );
};

export default Profile;
