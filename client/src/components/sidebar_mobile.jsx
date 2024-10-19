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
        <button className="bg-white m-0 text-2xl text-black p-4 rounded hover:bg-[#495195] hover:text-gray-300">
          Home
        </button>
        <button className="bg-transparent text-2xl text-black p-4 rounded hover:bg-[#495195] hover:text-gray-300">
          About Us
        </button>
        <button className="bg-white m-0 text-2xl text-black p-4 rounded hover:bg-[#495195] hover:text-gray-300">
          Jobs
        </button>
        <button className="bg-white m-0 text-2xl text-black p-4 rounded hover:bg-[#495195] hover:text-gray-300">
          Messages
        </button>
        <button className="bg-white m-0 text-2xl text-black p-4 rounded hover:bg-[#495195] hover:text-gray-300">
          Training
        </button>
        <button className="bg-white m-0 text-2xl text-black p-4 rounded hover:bg-[#495195] hover:text-gray-300">
          Certifications
        </button>
      </div>
    </div>
  );
};
export default SideBar;
