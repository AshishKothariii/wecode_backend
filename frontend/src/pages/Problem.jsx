import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from "../components/Navbar";

const Problem = () => {
  /*const [problem, setProblems] = useState([]);*/
  const navigate = useNavigate(); // Initialize useNavigate

  // Mock data for problems
  const [problems] = useState([
    { id: 102, name: "Two Sum", solvedBy: 1500 },
    { id: 2, name: "Reverse Linked List", solvedBy: 1200 },
    { id: 3, name: "Binary Search", solvedBy: 900 },
    { id: 4, name: "Merge Intervals", solvedBy: 800 },
    {
      id: 5,
      name: "Longest Substring Without Repeating Characters",
      solvedBy: 1100,
    },
  ]);
  /* useEffect(() => {
    // Fetch the problem list from the API
    const fetchProblems = async () => {
      try {
        const response = await fetch("https://api.example.com/problems");
        const data = await response.json();
        setProblems(data);
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    fetchProblems();
  }, []);
*/
  // Function to handle problem name click
  const handleProblemClick = (id) => {
    navigate(`/problems/${id}`); // Navigate to the problem detail page
  };

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Problem List</h1>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">S.No</th>
              <th className="py-2 px-4 border-b">Problem Name</th>
              <th className="py-2 px-4 border-b">Solved By</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem, index) => (
              <tr key={problem.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                <td
                  className="py-2 px-4 border-b text-blue-600 hover:text-blue-800 cursor-pointer"
                  onClick={() => handleProblemClick(problem.id)} // Add click handler
                >
                  {problem.name}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {problem.solvedBy}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Problem;
