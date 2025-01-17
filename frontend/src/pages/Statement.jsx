import React, { useState, useRef } from "react";
import Navbar from "../components/Navbar";

const Statement = () => {
  // Mock data for the problem statement
  const problemStatement = `
    Given an array of integers, return indices of the two numbers such that they add up to a specific target.

    You may assume that each input would have exactly one solution, and you may not use the same element twice.

    Example:
    Given nums = [2, 7, 11, 15], target = 9,

    Because nums[0] + nums[1] = 2 + 7 = 9,
    return [0, 1].
  `;

  // Mock data for submissions
  const submissions = [
    {
      sno: 1,
      submissionId: "12345",
      language: "C++",
      user: "user1",
      result: "Accepted",
    },
    {
      sno: 2,
      submissionId: "12346",
      language: "Python",
      user: "user2",
      result: "Wrong Answer",
    },
    {
      sno: 3,
      submissionId: "12347",
      language: "Java",
      user: "user3",
      result: "Runtime Error",
    },
  ];

  // Ref for the code editor textarea
  const codeEditorRef = useRef(null);

  // State for the selected language
  const [language, setLanguage] = useState("go");

  // State to toggle between Problem and Submissions view
  const [view, setView] = useState("problem");

  // State to store code for each language
  const [codeByLanguage, setCodeByLanguage] = useState({
    cpp: `#include <iostream>
using namespace std;

int main() {
    // Your code here
    return 0;
}`,
    go: `package main

import "fmt"

func main() {
    // Your code here
    fmt.Println("Hello, World!")
}`,
  });

  // Function to reset the code to the default template for the selected language
  const handleReset = () => {
    const defaultCode = {
      cpp: `#include <iostream>
using namespace std;

int main() {
    // Your code here
    return 0;
}`,
      go: `package main

import "fmt"

func main() {
    // Your code here
    fmt.Println("Hello, World!")
}`,
    };

    setCodeByLanguage((prev) => ({
      ...prev,
      [language]: defaultCode[language],
    }));

    // Update the textarea value
    if (codeEditorRef.current) {
      codeEditorRef.current.value = defaultCode[language];
    }
  };

  // Mock function to handle code submission
  const handleSubmit = () => {
    console.log("Submitted Code:", codeByLanguage[language]);
    console.log("Selected Language:", language);
    // Here you would call the API to submit the code
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 p-4">
        {/* Problem Statement Section */}
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
            <pre className="whitespace-pre-wrap">{problemStatement}</pre>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">S.No</th>
                  <th className="p-2 border">Submission ID</th>
                  <th className="p-2 border">Language</th>
                  <th className="p-2 border">User</th>
                  <th className="p-2 border">Result</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => (
                  <tr key={submission.sno} className="border">
                    <td className="p-2 border">{submission.sno}</td>
                    <td className="p-2 border">{submission.submissionId}</td>
                    <td className="p-2 border">{submission.language}</td>
                    <td className="p-2 border">{submission.user}</td>
                    <td className="p-2 border">{submission.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {/* Reset Button */}
          <div className="mt-4 flex justify-center">
            <button
              onClick={handleReset}
              className="bg-red-500 text-white px-8 py-2 rounded hover:bg-red-600 w-48"
            >
              Reset Code
            </button>
          </div>
        </div>

        {/* Code Editor Section */}
        <div className="w-1/2 p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <select
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
                // Update the textarea value when switching languages
                if (codeEditorRef.current) {
                  codeEditorRef.current.value = codeByLanguage[e.target.value];
                }
              }}
              className="p-2 border rounded"
            >
              <option value="cpp">C++</option>
              <option value="go">Go (Golang)</option>
              {/* Add more language options here if needed */}
            </select>
          </div>
          <textarea
            ref={codeEditorRef}
            value={codeByLanguage[language]}
            onChange={(e) => {
              setCodeByLanguage((prev) => ({
                ...prev,
                [language]: e.target.value,
              }));
            }}
            className="w-full flex-1 p-2 border rounded font-mono resize-none"
            placeholder="Write your code here..."
          />
          <div className="mt-4 flex justify-center space-x-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-8 py-2 rounded hover:bg-blue-600 w-48"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statement;
