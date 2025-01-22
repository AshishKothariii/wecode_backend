import { useState, useRef } from "react";
import axios from "axios";
import qs from "qs";

const CodeEditor = ({ problemId, onSubmissionSuccess }) => {
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState({
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
  const [submitting, setSubmitting] = useState(false);
  const codeEditorRef = useRef(null);

  // Reset code to default template
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

    setCode((prev) => ({
      ...prev,
      [language]: defaultCode[language],
    }));

    if (codeEditorRef.current) {
      codeEditorRef.current.value = defaultCode[language];
    }
  };

  // Handle code submission
  const handleSubmit = async () => {
    const currentCode = code[language].trim();
    if (!currentCode) {
      alert("Code cannot be empty!");
      return;
    }

    setSubmitting(true);

    const submissionData = {
      language: language,
      problem_id: problemId,
      username: localStorage.getItem("user"),
      code: currentCode,
    };

    try {
      const response = await axios.post(
        `/api/submission/problem/${problemId}`,
        qs.stringify(submissionData),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          withCredentials: true,
        }
      );
      onSubmissionSuccess();
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-1/2 p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <select
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
            if (codeEditorRef.current) {
              codeEditorRef.current.value = code[e.target.value];
            }
          }}
          className="p-2 border rounded"
        >
          <option value="go">Go (Golang)</option>
          <option value="cpp">C++</option>
          {/* Add more language options here if needed */}
        </select>
      </div>
      <textarea
        ref={codeEditorRef}
        value={code[language]}
        onChange={(e) => {
          setCode((prev) => ({
            ...prev,
            [language]: e.target.value,
          }));
        }}
        className="w-full flex-1 p-2 border rounded font-mono resize-none"
        placeholder="Write your code here..."
      />
      <div className="mt-4 flex justify-center space-x-4">
        <button
          onClick={handleReset}
          className="bg-red-500 text-white px-8 py-2 rounded hover:bg-red-600 w-48"
        >
          Reset Code
        </button>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="bg-blue-500 text-white px-8 py-2 rounded hover:bg-blue-600 w-48"
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default CodeEditor;
