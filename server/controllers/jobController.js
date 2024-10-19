const Job = require('../models/jobModel');
const Employer = require('../models/employerModel');

exports.addJob = async (req, res) => {
  try {
    const employerId = req.params.id;
    const employer = await Employer.findById(employerId);

    if (!employer) {
      return res.status(404).json({ message: 'Employer not found' });
    }

    const newJob = new Job({
      ...req.body,
      employer: employerId
    });

    await newJob.save();

    employer.listings.push({
      job_id: newJob._id,
      created_at: new Date()
    });

    await employer.save();

    res.status(201).json({
      message: 'Job added successfully',
      job: newJob,
      employer: employer
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const employerId = job.employer;

    await Job.findByIdAndDelete(jobId);

    await Employer.updateOne(
      { _id: employerId },
      { $pull: { listings: { job_id: jobId } } }
    );

    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single job by ID
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a job
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
