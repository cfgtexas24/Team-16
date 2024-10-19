import React, { useState } from "react";
import "./home.css";
import TopBar from "../../components/topbar";
import SideBar from "../../components/sidebar_mobile";

function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle the sidebar state
  };

  return (
    <div className="home-container m-0 p-0 relative h-screen">
      <div className="relative">
        <TopBar />
        <SideBar
          isOpen={isSidebarOpen}
          className="absolute visibility:hidden"
          toggleSidebar={toggleSidebar}
        />
      </div>
      <div className="flex items-center justify-between top-4 left-0 right-0 z-10 sm:hidden">
        <button onClick={toggleSidebar} className="m-4 p-2 rounded">
          <img
            src={
              isSidebarOpen
                ? "/icons8-cancel-48.png"
                : "/icons8-hamburger-menu-50.png"
            } // Reference images directly
            alt={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
            className="w-6 h-6" // Adjust size as necessary
          />
        </button>
        <button
          className="m-4 p-4 px-6 text-2xl text-gray-300 rounded-3xl"
          style={{ backgroundColor: "#495195" }}
        >
          Profile
        </button>
      </div>
      <div className="hidden sm:flex items-center justify-between top-0 left-0 right-0 z-10 p-4">
        <div className="flex space-x-8 pl-16">
          <button className="bg-transparent text-2xl text-black p-4 rounded hover:bg-[#495195] hover:text-gray-300">
            Home
          </button>
          <button className="bg-transparent text-2xl text-black p-4 rounded hover:bg-[#495195] hover:text-gray-300">
            Jobs
          </button>
          <button className="bg-transparent text-2xl text-black p-4 rounded hover:bg-[#495195] hover:text-gray-300">
            Messages
          </button>
          <button className="bg-transparent text-2xl text-black p-4 rounded hover:bg-[#495195] hover:text-gray-300">
            Training
          </button>
          <button className="bg-transparent text-2xl text-black p-4 rounded hover:bg-[#495195] hover:text-gray-300">
            Certifications
          </button>
        </div>{" "}
        <button
          className="m-4 p-4 px-6 text-2xl text-gray-300 rounded-3xl"
          style={{ backgroundColor: "#495195" }}
        >
          Profile
        </button>
      </div>
      <div className="content p-4">
        <h2
          className="text-2xl text-black font-bold p-10"
          style={{ backgroundColor: "#F6C344" }}
        >
          Welcome Priyanka Koppula
        </h2>
      </div>
    </div>
  );
}

export default HomePage;
