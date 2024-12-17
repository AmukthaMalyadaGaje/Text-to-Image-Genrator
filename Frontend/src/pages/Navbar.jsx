import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const handleGenerateImage = () => {
    // Open localhost:3000 in a new tab/window
    const url = `http://localhost:3000`;
    window.open(url, "_blank");
  };
  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-indigo-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link to="/" className="hover:text-indigo-300">
            Text to Image Generator
          </Link>
        </div>
        <div className="flex space-x-6">
          <Link
            to="/"
            className="text-white hover:text-indigo-300 font-medium text-lg"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="text-white hover:text-indigo-300 font-medium text-lg"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-white hover:text-indigo-300 font-medium text-lg"
          >
            Signup
          </Link>
          <button
            onClick={handleGenerateImage}
            className="text-white hover:text-indigo-300 font-medium text-lg"
          >
            Generate Image
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
