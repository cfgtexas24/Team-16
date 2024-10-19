import React, { useState, useEffect } from 'react';
import './JobPageStyling.css'; // Your CSS file with mobile styling
import { getJobs, getJobsbyFeature } from '../../lib/auth';
import { getDecodedToken } from '../../lib/auth';
// Job data defined directly inside the component file



const JobPage = () => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown state
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [job, setJob] = useState([]); // Initialize with an empty array
  const [e, sete] = useState("")
  useEffect(() => {
    const decodedToken = getDecodedToken();
    const { email } = decodedToken;
    sete(email);
  }, []);
  // Track the application status for each job (an array of booleans)
  const [appliedJobs, setAppliedJobs] = useState({});

  // Use useEffect to fetch jobs on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobs = await getJobs(); // Fetch jobs
        setJob(jobs); // Set job state
        setFilteredJobs(jobs); // Set filteredJobs to all jobs initially
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs(); // Call the fetch function
  }, []); // Empty dependency array means this runs once when the component mounts

   // Function to handle category selection
   const handleCategorySelect = async (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);

    // Filter jobs by category
    if (category === 'All') {
      setFilteredJobs(await getJobs());
    } else {
      console.log(category)
      setFilteredJobs(await getJobsbyFeature(category));
    }
  };

  // Function to handle applying to a job
  const handleApply = (jobId) => {
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
            <button onClick={() => handleCategorySelect('tech')}>Tech</button>
            <button onClick={() => handleCategorySelect('construction')}>Construction</button>
            <button onClick={() => handleCategorySelect('retail')}>Retail</button>
          </div>
        )}
      </div>

      {/* Render the list of jobs */}
      <div className="job-list">
  {filteredJobs && filteredJobs.length > 0 ? (
    filteredJobs.map((job) => (
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

          {appliedJobs[job.id] ? (
            <div className="check-mark">&#10003;</div>
          ) : (
            <button className="apply-button" onClick={() => handleApply(job.id)}>
              Apply
            </button>
          )}
        </div>
      </div>
    ))
  ) : (
    <p>No jobs available.</p> // Message when there are no jobs
  )}
</div>
    </div>
  );
};

export default JobPage;