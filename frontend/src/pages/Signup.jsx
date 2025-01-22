import { useRef, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AuthContext } from "../AuthContext";

const Signup = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [apiError, setApiError] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordPattern.test(password);
  };

  const handleSignup = async () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    setNameError("");
    setEmailError("");
    setPasswordError("");

    if (!name) {
      setNameError("Username is required.");
      return;
    }

    if (!email) {
      setEmailError("Email is required.");
      return;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setPasswordError("Password is required.");
      return;
    } else if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters long, with 1 uppercase, 1 lowercase, and 1 number."
      );
      return;
    }

    try {
      const response = await axios.post(
        "/api/user/signup",
        {
          username: name,
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const { username, email } = response.data;
        login(username, email);
        navigate("/");
      }
    } catch (error) {
      setApiError(
        error.response?.data?.error || "Signup failed. Please try again."
      );
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Username:
            </label>

            <input
              type="text"
              id="name"
              ref={nameRef}
              placeholder="Enter your name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {nameError && (
              <p className="text-red-500 text-sm mt-1">{nameError}</p>
            )}
          </div>
          <div className="mb-4">
            {apiError && (
              <p className="text-red-500 text-sm text-center">{apiError}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              placeholder="Enter your email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              ref={passwordRef}
              placeholder="Enter your password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>
          <button
            onClick={handleSignup}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Signup
          </button>
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <span
              className="text-blue-600 hover:text-blue-800 cursor-pointer"
              onClick={handleLoginRedirect}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
