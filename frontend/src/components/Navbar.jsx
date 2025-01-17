import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // Import the logo

const Navbar = () => {
  const currentUser = 1;

  return (
    <div className="w-full h-16 bg-white border border-black flex items-end px-4">
      {/* Logo */}
      <Link to="/" className="flex items-end pb-2">
        <img
          alt="Logo"
          className="h-10" // Adjust the height of the logo as needed
          src={logo}
        />
      </Link>

      {/* Navigation Links */}
      <div className="flex-grow flex justify-end items-end space-x-4 pb-2">
        {currentUser ? (
          <>
            <Link to="/problems" className="text-black hover:text-blue-500">
              <div>Problems</div>
            </Link>
            <Link to="/profile" className="text-black hover:text-blue-500">
              <div>Profile</div>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="text-black hover:text-blue-500">
              <div>Login</div>
            </Link>
            <Link to="/signup" className="text-black hover:text-blue-500">
              <div>Signup</div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
