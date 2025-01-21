import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center text-center p-6">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">Wecode</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Sharpen your coding skills, solve real-world problems, and compete
            with developers worldwide on our online judge platform.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/signup"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Get Started
            </a>
            <a
              href="/login"
              className="bg-white text-blue-600 px-6 py-3 rounded-md border border-blue-600 hover:bg-blue-50 transition duration-300"
            >
              Login
            </a>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Why Choose Wecode?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Real-World Problems
              </h3>
              <p className="text-gray-600">
                Solve coding challenges designed to mimic real-world scenarios
                and improve your problem-solving skills.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Leaderboard
              </h3>
              <p className="text-gray-600">
                Compete with developers worldwide and climb the leaderboard to
                showcase your skills.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Community Support
              </h3>
              <p className="text-gray-600">
                Join a vibrant community of developers, share solutions, and
                learn from others.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-16 bg-blue-600 text-white py-12 w-full">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Coding?</h2>
            <p className="text-lg mb-6">
              Join Wecode today and take your coding skills to the next level.
            </p>
            <a
              href="/signup"
              className="bg-white text-blue-600 px-6 py-3 rounded-md hover:bg-blue-50 transition duration-300"
            >
              Sign Up Now
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
