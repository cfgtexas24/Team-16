import React, { useEffect, useState } from "react";
import "./home.css";
import TopBar from "../../components/topbar";
import SideBar from "../../components/sidebar_mobile";
import StreakCard from "../../components/streak_card";
import ApplicationList from "../../components/application_list";
function HomePage() {
  const [n, setName] = useState("");
  useEffect(() => {
    // const decodedToken = getDecodedToken();
    // const { name } = decodedToken;
    // setName(name);
  }, []);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility
  // const navigate = useNavigate(); // Initialize useNavigate

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle the sidebar state
  };
  useEffect(() => {
    const handleResize = () => {
      // Close the sidebar if the screen width is greater than or equal to 640px (sm breakpoint)
      if (window.innerWidth >= 640) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize); // Add the resize event listener
    return () => {
      window.removeEventListener("resize", handleResize); // Clean up the event listener on unmount
    };
  }, []);

  return (
    <div className="home-container m-0 p-0 relative h-full">
      <TopBar />
      <SideBar
        isOpen={isSidebarOpen}
        className="absolute visibility:hidden"
        toggleSidebar={toggleSidebar}
      />
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
        <button className="m-4 p-1 rounded-full border-4 border-[#495195] bg-transparent flex items-center justify-center">
          <img
            src="/icons8-user-100.png" // Ensure the path is correct
            alt="Profile"
            className="w-8 h-8" // Adjust size as necessary
          />
        </button>
      </div>
      <div className="hidden sm:flex items-center justify-between top-0 left-0 right-0 z-10 p-4">
        <div className="flex space-x-8 pl-16">
          <button className="bg-transparent text-2xl text-black p-4 rounded hover:bg-[#495195] hover:text-gray-300">
            Home
          </button>
          <button className="bg-transparent text-2xl text-black p-4 rounded hover:bg-[#495195] hover:text-gray-300">
            About Us
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
        <button className="m-4 p-2 rounded-full border-4 border-[#495195] bg-transparent flex items-center justify-center">
          <img
            src="/icons8-user-100.png" // Ensure the path is correct
            alt="Profile"
            className="w-10 h-10" // Adjust size as necessary
          />
        </button>
      </div>
      <div className="content py-4">
        <h2
          className="text-2xl lg:text-4xl text-black font-bold p-10 lg:p-20"
          style={{ backgroundColor: "#F6C344" }}
        >
          Overview
        </h2>
      </div>
      <StreakCard />
      <ApplicationList />
    </div>
  );
}

export default HomePage;
