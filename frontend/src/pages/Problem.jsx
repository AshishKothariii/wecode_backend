import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const Problem = () => {
  const [problems, setProblems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get("http://localhost:3000/problem", {
          withCredentials: true,
        });
        setProblems(response.data);
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    fetchProblems();
  }, []);

  const handleProblemClick = (id) => {
    navigate(`/problems/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Problem List</h1>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase">
                  S.No
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase">
                  Problem Name
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase">
                  Solved By
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {problems.map((problem, index) => (
                <tr
                  key={problem.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="py-4 px-4 text-sm text-gray-700 text-center">
                    {index + 1}
                  </td>
                  <td
                    className="py-4 px-4 text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
                    onClick={() => handleProblemClick(problem.problemId)}
                  >
                    {problem.problemTitle}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-700 text-center">
                    {problem.solvedBy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem;
