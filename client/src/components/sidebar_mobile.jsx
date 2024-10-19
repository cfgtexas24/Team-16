import React from "react";

const SideBar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`absolute left-0 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 bg-white text-white h-full w-full p-4 mt-20 z-20`}
    >
      <div className="flex flex-col">
        {/* Flex column for vertical layout */}
        <a href="/home">
          <button className="bg-white m-0 text-2xl text-black p-4 rounded hover:bg-[#495195] hover:text-gray-300">
            Home
          </button>
        </a>
        <a href="/about">
          <button className="bg-transparent text-2xl text-black p-4 rounded hover:bg-[#495195] hover:text-gray-300">
            About Us
          </button>
        </a>
        <a href="/jobs">
          <button className="bg-white m-0 text-2xl text-black p-4 rounded hover:bg-[#495195] hover:text-gray-300">
            Jobs
          </button>
        </a>
        <a href="/messages">
          <button className="bg-white m-0 text-2xl text-black p-4 rounded hover:bg-[#495195] hover:text-gray-300">
            Messages
          </button>
        </a>
        <a href="/training">
          <button className="bg-white m-0 text-2xl text-black p-4 rounded hover:bg-[#495195] hover:text-gray-300">
            Training
          </button>
        </a>
        <a href="/certifications">
          <button className="bg-white m-0 text-2xl text-black p-4 rounded hover:bg-[#495195] hover:text-gray-300">
            Certifications
          </button>
        </a>
        <a href="/resources">
          <button className="bg-white m-0 text-2xl text-black p-4 rounded hover:bg-[#495195] hover:text-gray-300">
            Resources
          </button>
        </a>
      </div>
    </div>
  );
};

export default SideBar;
