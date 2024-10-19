import React, { useEffect, useState } from 'react';
import './login.css'
import { loginEmployee } from '../../lib/auth';
import { Link, useNavigate } from 'react-router-dom';
import { getDecodedToken } from '../../lib/auth';
function EmployeeLoginPage() {
  useEffect(()=>{
    if (getDecodedToken()) {
        window.location.href = '/home'
    }
  }, [])
  // States for handling user input
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginEmployee(username, password);
      // If login is successful, navigate to the profile page
      navigate('/profile');
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error (e.g., show an error message to the user)
    }
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
          placeholder="Enter your employee username" 
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
        <a href="/mentor-signin">Mentor or Alumni? <strong>Sign in here</strong></a>
        <a href="/">Client? <strong>Sign in here</strong></a>
        <a href="/admin-signin">Administrator? <strong>Sign in here</strong></a>
      </div>
    </header>
  );
}

export default EmployeeLoginPage;
