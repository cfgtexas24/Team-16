import React, { useState } from "react";
import "./login.css";
import { login } from "../../lib/auth";
import { Link } from "react-router-dom";
function LoginPage() {
  // States for handling user input
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    // You would send the data to the backend for authentication here

    login(username, password);
  };

  return (
    <header className="App-header">
      <h1>ReBirth Empowerment Education</h1>
      <p className="hero-text">
        Empowering people to find jobs and equip themselves for success
      </p>
      <form className="sign-in-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </form>
      <div className="signup-link">
        Don't have an account? <Link to="/register">Sign up now</Link>
      </div>

      <div className="additional-signin">
        <h3>Are you a Mentor, Employer, or Administrator?</h3>
        <a href="/mentor-signin">
          Mentor or Alumni? <strong>Sign in here</strong>
        </a>
        <a href="/employer-signin">
          Employer looking for talent? <strong>Sign in here</strong>
        </a>
        <a href="/admin-signin">
          Administrator? <strong>Sign in here</strong>
        </a>
      </div>
    </header>
  );
}

export default LoginPage;
