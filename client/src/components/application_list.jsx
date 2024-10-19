import React, { useState } from "react";
import { Card, CardContent, Tabs, Tab, Box } from "@mui/material";

const ApplicationList = () => {
  const [filter, setFilter] = useState(0); // 0 for active, 1 for inactive

  // Sample application data
  const applications = [
    {
      id: 1,
      company: "Microsoft",
      position: "DevOps Application Developer",
      stage: "Interview",
      isActive: true,
    },
    {
      id: 2,
      company: "Google",
      position: "Software Engineer",
      stage: "Application Submitted",
      isActive: true,
    },
    {
      id: 3,
      company: "Amazon",
      position: "Data Scientist",
      stage: "Offer",
      isActive: false,
    },
    {
      id: 4,
      company: "Facebook",
      position: "Frontend Developer",
      stage: "Interview",
      isActive: true,
    },
    {
      id: 5,
      company: "IBM",
      position: "Backend Developer",
      stage: "Rejected",
      isActive: false,
    },
  ];

  // Filter applications based on the selected option
  const filteredApplications = applications.filter((app) => {
    return filter === 0 ? app.isActive : !app.isActive;
  });

  return (
    <Card
      className="max-w-lg mx-auto bg-[#fdf3da] shadow-md mt-6 p-6"
      sx={{
        backgroundColor: "#fdf3da", // Light gray background for the card
      }}
    >
      <CardContent>
        <h2 className="text-2xl font-bold mb-4" style={{ color: "#495195" }}>
          My Application List
        </h2>

        {/* Material-UI Tabs for filtering applications */}
        <Tabs
          value={filter}
          onChange={(event, newValue) => setFilter(newValue)}
          textColor="#495195"
          indicatorColor="#495195"
          className="mb-4"
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "#495195", // Custom blue for indicator
            },
          }}
          centered
        >
          <Tab
            label="Active Applications"
            sx={{
              color: filter === 0 ? "#495195" : "gray", // Custom blue for active tab font
              fontWeight: filter === 0 ? "bold" : "normal",
              "&:hover": { color: "#495195" }, // Blue on hover for inactive
            }}
          />
          <Tab
            label="Inactive Applications"
            sx={{
              color: filter === 1 ? "#495195" : "gray", // Custom blue for active tab font
              fontWeight: filter === 1 ? "bold" : "normal",
              "&:hover": { color: "#495195" }, // Blue on hover for inactive
            }}
          />
        </Tabs>

        {/* Application List */}
        <ul className="list-none">
          {filteredApplications.map((app) => (
            <li key={app.id} className="border p-4 mb-2 rounded shadow-md">
              <h2 className="text-xl font-semibold">
                {app.position} at {app.company}
              </h2>
              <p className="text-gray-600">Stage: {app.stage}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ApplicationList;
