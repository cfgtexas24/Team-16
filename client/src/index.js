import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import LoginPage from "./features/login/LoginPage";
import RegisterPage from "./features/register/RegisterPage";
import ProfileView from "./components/profileView";
import ViewDocInDevelopment from "./features/resume-generator/ViewDocInDevelopment";
import HomePage from "./features/home/HomePage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import './App.css';
import JobPage from './features/Job Page/JobPage';

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
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/profile",
    element: <ProfileView />,
  },
  {
    path: "/resume-dev",
    element: <ViewDocInDevelopment />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
