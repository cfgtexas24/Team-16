import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./JobPageStyling.css"; // Your CSS file with mobile styling
import { getJobs, getJobsbyFeature } from "../../lib/auth";
import AppLayout from "../../components/AppLayout";

const JobPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [job, setJob] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState({});
  const [employers, setEmployers] = useState({}); // State to hold employer info

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobs = await getJobs(); // Fetch jobs
        setJob(jobs); // Set job state
        setFilteredJobs(jobs); // Set filteredJobs to all jobs initially

        // Fetch employer info for each job
        const employerPromises = jobs.map(async (job) => {
          try {
            const response = await fetch(
              process.env.REACT_APP_BACKEND_URL +
                `/api/employers/${job.employer}`
            );
            if (!response.ok) {
              throw new Error(
                `Failed to fetch employer data for job ID: ${job.id}`
              );
            }
            const employerData = await response.json();
            console.log(response);
            return { ...job, employerData }; // Attach employer data to job
          } catch (err) {
            console.error(err);
            return { ...job, employerData: null }; // Return job without employer data on failure
          }
        });

        const jobsWithEmployers = await Promise.all(employerPromises);
        setFilteredJobs(jobsWithEmployers); // Update filteredJobs with employer data
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs(); // Call the fetch function
  }, []);

  const handleCategorySelect = async (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);

    if (category === "All") {
      const jobs = await getJobs();
      setFilteredJobs(jobs);
    } else {
      setFilteredJobs(await getJobsbyFeature(category));
    }
  };

  const handleApply = (id) => {
    setAppliedJobs({ ...appliedJobs, [id]: true });
  };

  return (
    <AppLayout title="Jobs">
      <div className="job-page">

        <div className="search-category">
          <button
            className="category-button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {selectedCategory} &#x25BC; {/* Down arrow */}
          </button>
          {isDropdownOpen && (
            <div className="category-dropdown">
              <button onClick={() => handleCategorySelect("All")}>All</button>
              <button onClick={() => handleCategorySelect("tech")}>Tech</button>
              <button onClick={() => handleCategorySelect("construction")}>
                Construction
              </button>
              <button onClick={() => handleCategorySelect("retail")}>
                Retail
              </button>
            </div>
          )}
        </div>
  
        <div className="job-list">
          {filteredJobs && filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div className="job-card" key={job.id}>
                <div className="company-info">
                  {job.employerData ? (
                    <>
                      <img
                        src={job.employerData.company_logo}
                        alt={job.employerData.company_name}
                        className="company-logo"
                      />
                      <h4>{job.employerData.company_name}</h4>
                    </>
                  ) : (
                    <p>Loading employer info...</p> // Placeholder while loading
                  )}
                </div>
                <div className="job-details">
                  <h3>Position: {job.title}</h3>
                  <p>Location: {job.location}</p>
                  <p>Salary: {job.salary}</p>
                  <p>
                    Shift Hours: {job.shiftHours.start} - {job.shiftHours.end}
                  </p>
                  {appliedJobs[job.id] ? (
                    <div className="check-mark">&#10003;</div>
                  ) : (
                    <button
                      className="apply-button"
                      onClick={() => handleApply(job.id)}
                    >
                      Apply
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No jobs available.</p>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default JobPage;
