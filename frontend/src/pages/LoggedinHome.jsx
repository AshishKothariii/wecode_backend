import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const LoggedinHome = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user", {
          withCredentials: true,
        });
        setUserData(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Unable to fetch user data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center text-center p-6">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Loading...
            </h1>
          ) : error ? (
            <h1 className="text-5xl font-bold text-red-600 mb-6">{error}</h1>
          ) : (
            <>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Welcome Back,{userData.name}
                <span className="text-blue-600">{userData.username}</span>!
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Ready to tackle new challenges and improve your coding skills?
                Dive into your personalized dashboard or explore new challenges.
              </p>
              <div className="flex gap-4 justify-center">
                <a
                  href="/profile"
                  className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Go to Profile
                </a>
                <a
                  href="/problems"
                  className="bg-white text-blue-600 px-6 py-3 rounded-md border border-blue-600 hover:bg-blue-50 transition duration-300"
                >
                  Explore Problems
                </a>
              </div>
            </>
          )}
        </div>

        {!isLoading && !error && (
          <div className="mt-16 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Your Progress at a Glance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Overview 1 */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Problems Solved
                </h3>
                <p className="text-gray-600 text-4xl font-bold">
                  {userData.accepted_count}
                </p>
              </div>
              {/* Overview 2 */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Current Rank
                </h3>
                <p className="text-gray-600 text-4xl font-bold">
                  {"#comingsoon"}
                </p>
              </div>
              {/* Overview 3 */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Streak
                </h3>
                <p className="text-gray-600 text-4xl font-bold">
                  {userData.streak} Days
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-16 bg-gray-100 py-12 w-full">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Quick Links
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Link 1 */}
              <a
                href="/problems"
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-gray-900 text-center"
              >
                <h3 className="text-xl font-semibold mb-4">Solve Challenges</h3>
                <p className="text-gray-600">
                  Browse and solve a variety of coding challenges to sharpen
                  your skills.
                </p>
              </a>
              {/* Link 2 */}
              <a
                href="/leaderboard"
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-gray-900 text-center"
              >
                <h3 className="text-xl font-semibold mb-4">Leaderboard</h3>
                <p className="text-gray-600">
                  See where you rank among other developers worldwide.
                </p>
              </a>
              {/* Link 3 */}
              <a
                href="/community"
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-gray-900 text-center"
              >
                <h3 className="text-xl font-semibold mb-4">Community</h3>
                <p className="text-gray-600">
                  Join discussions, share solutions, and connect with other
                  developers.
                </p>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LoggedinHome;
