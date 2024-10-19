import React, { useState } from 'react';
import './JobPageStyling.css'; // Your CSS file with mobile styling

// Job data defined directly inside the component file
const job = [
  {
    id: 1,
    category: 'Tech',
    company: 'Tech Corp',
    position: 'Data Analyst',
    location: 'Houston',
    salary: '$65,000',
    hours: '9am - 5pm',
    logo: 'https://jpmc-team16.s3.us-east-2.amazonaws.com/Screenshot+2024-10-19+at+12.52.02%E2%80%AFAM.png',
  },
  {
    id: 2,
    category: 'Construction',
    company: 'BuildIt',
    position: 'Construction Worker',
    location: 'Austin',
    salary: '$45,000',
    hours: '8am - 4pm',
    logo: 'https://via.placeholder.com/50',
  },
  {
    id: 3,
    category: 'Retail',
    company: 'ShopEase',
    position: 'Store Manager',
    location: 'Dallas',
    salary: '$55,000',
    hours: '10am - 6pm',
    logo: 'https://via.placeholder.com/50',
  },
];

const JobPage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown state
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredJobs, setFilteredJobs] = useState(job); // Use the `job` array directly

  // Track the application status for each job (an array of booleans)
  const [appliedJobs, setAppliedJobs] = useState({});

  // Function to handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false); // Close the dropdown when a category is selected

    // Filter jobs by category
    if (category === 'All') {
      setFilteredJobs(job);
    } else {
      const filtered = job.filter((job) => job.category === category);
      setFilteredJobs(filtered);
    }
  };

  // Function to handle applying to a job
  const handleApply = (id) => {
    // Mark the job as applied by updating the state
    setAppliedJobs({ ...appliedJobs, [id]: true });
  };


  return (
    <div className="job-page">
      <header className="header">
        <img src="your_logo_url" alt="Rebirth Empowerment" className="logo" />
        <button className="close-button">X</button>
      </header>

      {/* Category selection dropdown */}
      <div className="search-category">
        <button className="category-button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          {selectedCategory} &#x25BC; {/* Down arrow */}
        </button>

        {/* Dropdown list */}
        {isDropdownOpen && (
          <div className="category-dropdown">
            <button onClick={() => handleCategorySelect('All')}>All</button>
            <button onClick={() => handleCategorySelect('Tech')}>Tech</button>
            <button onClick={() => handleCategorySelect('Construction')}>Construction</button>
            <button onClick={() => handleCategorySelect('Retail')}>Retail</button>
          </div>
        )}
      </div>

      {/* Render the list of jobs */}
      <div className="job-list">
        {filteredJobs.map((job) => (
          <div className="job-card" key={job.id}>
            <div className="company-info">
              <img src={job.logo} alt={job.company} className="company-logo" />
              <h4>{job.company}</h4>
            </div>
            <div className="job-details">
              <h3>Position: {job.position}</h3>
              <p>Location: {job.location}</p>
              <p>Salary: {job.salary}</p>
              <p>Shift Hours: {job.hours}</p>

              {/* Conditionally render the Apply button or the checkmark */}
              {appliedJobs[job.id] ? (
                <div className="check-mark">&#10003;</div> // Unicode checkmark
              ) : (
                <button className="apply-button" onClick={() => handleApply(job.id)}>
                  Apply
                </button>
              )}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobPage;