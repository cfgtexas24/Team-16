import React, { useEffect, useState } from "react";
import "./home.css";
import TopBar from "../../components/topbar";
import SideBar from "../../components/sidebar_mobile";
import StreakCard from "../../components/streak_card";
import ApplicationList from "../../components/application_list";
import Navbar from "../../components/navbar"; // Import the Navbar component

function HomePage() {
  const [n, setName] = useState("");
  useEffect(() => {
    // const decodedToken = getDecodedToken();
    // const { name } = decodedToken;
    // setName(name);
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility

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
        <a href="/profile" className="m-4">
          <button className="p-2 rounded-full border-4 border-[#495195] bg-transparent flex items-center justify-center">
            <img
              src="/icons8-user-100.png" // Ensure the path is correct
              alt="Profile"
              className="w-10 h-10" // Adjust size as necessary
            />
          </button>
        </a>
      </div>
      <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
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
