import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar /> {/* Use Navbar without self-closing tag */}
      <main className="flex-grow flex items-center justify-center">
        Welcome to Wecode
      </main>
      <Footer />
    </div>
  );
};

export default Home;
