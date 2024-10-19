// components/Navbar.js
import React from "react";
import { Link } from "react-router-dom"; // Ensure you have react-router-dom installed

function Navbar({ isSidebarOpen, toggleSidebar }) {
  return (
    <div className="hidden sm:flex items-center justify-between top-0 left-0 right-0 z-10 p-4">
      <div className="flex space-x-8 pl-16">
        <Link to="/home">
          <button className="bg-transparent text-2xl text-black p-4 rounded hover:bg-[#495195] hover:text-gray-300">
            Home
          </button>
        </Link>
        <Link to="/about">
          <button className="bg-transparent text-2xl text-black p-4 rounded hover:bg-[#495195] hover:text-gray-300">
            About Us
          </button>
        </Link>
        <Link to="/jobs">
          <button className="bg-transparent text-2xl text-black p-4 rounded hover:bg-[#495195] hover:text-gray-300">
            Jobs
          </button>
        </Link>
        <Link to="/messages">
          <button className="bg-transparent text-2xl text-black p-4 rounded hover:bg-[#495195] hover:text-gray-300">
            Messages
          </button>
        </Link>
        <Link to="/training">
          <button className="bg-transparent text-2xl text-black p-4 rounded hover:bg-[#495195] hover:text-gray-300">
            Training
          </button>
        </Link>
        <Link to="/certifications">
          <button className="bg-transparent text-2xl text-black p-4 rounded hover:bg-[#495195] hover:text-gray-300">
            Certifications
          </button>
        </Link>
        <Link to="/resources">
          <button className="bg-transparent text-2xl text-black p-4 rounded hover:bg-[#495195] hover:text-gray-300">
            Resources
          </button>
        </Link>
      </div>
      <Link to="/profile" className="m-4">
        <button className="p-2 rounded-full border-4 border-[#495195] bg-transparent flex items-center justify-center">
          <img
            src="/icons8-user-100.png" // Ensure the path is correct
            alt="Profile"
            className="w-10 h-10" // Adjust size as necessary
          />
        </button>
      </Link>
    </div>
  );
}

export default Navbar;
