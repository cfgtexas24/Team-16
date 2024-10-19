import React, { useState } from "react";
import { Card, CardContent } from "@mui/material";
import ApplicationList from "./application_list";

const StreakCard = () => {
  return (
    <Card
      className="max-w-lg mx-auto bg-[#fdf3da] shadow-md mt-4 p-6"
      sx={{
        backgroundColor: "#fdf3da", // Light gray background for the card
      }}
    >
      <CardContent>
        {/* Heading */}
        <div className="font-bold text-xl lg:text-3xl text-[#495195] relative">
          <span className="relative pt-16 z-10">
            You're on a daily hot streak!
          </span>
        </div>

        {/* Fire icons and counter */}
        <div className="mt-8 relative w-full h-64 bg-center text-center">
          <div className="flex justify-center items-center relative">
            {/* First fire image */}
            <div
              className="relative"
              style={{
                backgroundImage: "url('/icons8-fire2-100.png')",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                width: "15rem", // Adjust width as necessary
                height: "15rem", // Adjust height as necessary
                marginRight: "-5.5rem", // Negative margin for overlap
              }}
            ></div>

            {/* Second fire image */}
            <div
              className="relative"
              style={{
                backgroundImage: "url('/icons8-fire2-100.png')",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                width: "15rem",
                height: "15rem",
                marginLeft: "-5.5rem", // Negative margin for overlap
                marginRight: "-5.5rem", // Negative margin for overlap
                zIndex: 3,
              }}
            ></div>

            {/* Third fire image */}
            <div
              className="relative"
              style={{
                backgroundImage: "url('/icons8-fire2-100.png')",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                width: "15rem",
                height: "15rem",
                marginLeft: "-5.5rem", // Negative margin for overlap
              }}
            ></div>
          </div>

          {/* Counter text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-white text-4xl font-bold z-10 text-[#495195]">
              10 days
            </h2>
          </div>
        </div>

        {/* Additional text */}
        <div className="text-center text-l">
          You've been on this app for 526 minutes!
        </div>
      </CardContent>
    </Card>
  );
};

export default StreakCard;
