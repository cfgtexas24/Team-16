import React, { useEffect, useState } from "react";
import "./home.css";
import StreakCard from "../../components/streak_card";
import ApplicationList from "../../components/application_list";
import "animate.css";

import AppLayout from "../../components/AppLayout";

function HomePage() {
  return (
    <AppLayout title="Overview">
      {/* Using animate__faster class to speed up */}
      <div className="animate__animated animate__fadeInUp animate__faster">
        <StreakCard />
      </div>
      <div
        className="animate__animated animate__fadeInUp animate__faster"
        style={{ animationDelay: "0.5s" }}
      >
        <ApplicationList />
      </div>
    </AppLayout>
  );
}

export default HomePage;
