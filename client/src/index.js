import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import LoginPage from "./features/login/LoginPage";
import RegisterPage from "./features/register/RegisterPage";
import ProfileView from "./components/profileView";
import ViewDocInDevelopment from "./features/resume-generator/ViewDocInDevelopment";
import AppLayout from "./features/home/HomePage";

import EmployeeLoginPage from "./features/login/EmployeeLoginPage";
import MentorLoginPage from "./features/login/MentorLoginPage";
import Header from "./components/topbar";
import CertificatePage from "./features/CertificatePage/Certificate";
import AdminDataPage from "./features/AdminDataPage/DataPage";

import CoverLetterGenerator from "./features/cover-letter-generator/CoverLetterGenerator";
import ResumeReviewer from "./features/resume-reviewer/Reviewer";
import Resources from "./features/misc-resources/Resources";
import BudgetGame from "./features/budget-game/BudgetGame";
import Messages from "./features/messages/Messages";
import TrainingModule from "./features/Training/training";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import "./App.css";
import JobPage from "./features/Job Page/JobPage";

import AdminLoginPage from "./features/login/AdminLoginPage";

import Stocks from "./features/stocks/Stocks";
import AboutUs from "./features/AboutUsPage/aboutus";
import CertificationsPage from "./features/CertificatePage/Certificate";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },

  {
    path: "/jobs",
    element: <JobPage />,
  },
  {
    path: "/about",
    element: <AboutUs />,
  },
  {
    path: "/certifications",
    element: <CertificationsPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/profile",
    element: <ProfileView />,
  },
  {
    path: "/resume-generator",
    element: <ViewDocInDevelopment />,
  },
  {
    path: "/home",
    element: <AppLayout />,
  },
  {
    path: "/employer-signin",
    element: <EmployeeLoginPage />,
  },
  {
    path: "/mentor-signin",
    element: <MentorLoginPage />,
  },
  {
    path: "/admin-signin",
    element: <AdminLoginPage />,
  },
  {
    path: "/admin",
    element: <AdminDataPage />,
  },
  {
    path: "/cover-letter-generator",
    element: <CoverLetterGenerator />,
  },
  {
    path: "/resume-reviewer",
    element: <ResumeReviewer />,
  },
  {
    path: "/stocks",
    element: <Stocks />,
  },
  {
    path: "/resources",
    element: <Resources />,
  },
  {
    path: "/budget-game",
    element: <BudgetGame />,
  },
  {
    path: "/certifications",
    element: <CertificatePage />,
  },
  {
    path: "/messages",
    element: <Messages />,
  },
  {
    path: "/training", // Add the new route for TrainingModule
    element: <TrainingModule />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Header />
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
