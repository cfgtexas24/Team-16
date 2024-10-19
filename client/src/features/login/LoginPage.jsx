import React, { useState } from 'react';
import './login.css'

function LoginPage() {
  // States for handling user input
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    // You would send the data to the backend for authentication here
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
          placeholder="Enter your userhuiojouname" 
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
        Don't have an account? <a href="/signup">Sign up now</a>
      </div>

      <div className="additional-signin">
        <h3>Are you a Mentor, Employer, or Administrator?</h3>
        <a href="/mentor-signin">Mentor or Alumni? <strong>Sign in here</strong></a>
        <a href="/employer-signin">Employer looking for talent? <strong>Sign in here</strong></a>
        <a href="/admin-signin">Administrator? <strong>Sign in here</strong></a>
      </div>
    </header>
  );
}

export default LoginPage;