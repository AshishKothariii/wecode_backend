import { useRef, useState } from "react";
import { AuthContext } from "../AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleLogin = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    setEmailError("");
    setPasswordError("");

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
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/user/login",
        {
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

        navigate("/problems");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Login failed. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
