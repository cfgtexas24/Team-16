import React, { useEffect, useState } from "react";
import "./home.css";
import StreakCard from "../../components/streak_card";
import ApplicationList from "../../components/application_list";

import AppLayout from "../../components/AppLayout";

function HomePage() { 
  return (
    <AppLayout title="Overview">
      <StreakCard />
      <ApplicationList />
    </AppLayout>
  )
}



export default HomePage;
