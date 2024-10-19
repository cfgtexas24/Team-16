const Job = require('../models/jobModel');
require('dotenv').config();

exports.createJob = async (req, res) => {
    const { title, description, company, location, pay, category, workHours } = req.body;

    try {
        const newJob = new Job({
            title,
            description,
            company,
            location,
            pay,
            category,
            workHours
        });

        await newJob.save();
        res.status(201).json(newJob);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getJobById = async (req, res) => {
    const { id } = req.params;

    try {
        const job = await Job.findById(id);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateJob = async (req, res) => {
    const { id } = req.params;
    const { title, description, company, location, pay, category, workHours } = req.body;

    try {
        const job = await Job.findById(id);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        if (title) job.title = title;
        if (description) job.description = description;
        if (company) job.company = company;
        if (location) job.location = location;
        if (pay) job.pay = pay;
        if (category) job.category = category;
        if (workHours) job.workHours = workHours;

        await job.save();
        res.status(200).json({ message: "Job updated successfully", job });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteJob = async (req, res) => {
    const { id } = req.params;

    try {
        const job = await Job.findByIdAndDelete(id);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.searchJobsByCategory = async (req, res) => {
    const { category } = req.params;

    try {
        const jobs = await Job.find({ category });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.searchJobs = async (req, res) => {
    const { title, company, location, category, minPay, maxPay } = req.query;

    try {
        const query = {};
        if (title) query.title = new RegExp(title, 'i'); 
        if (company) query.company = new RegExp(company, 'i');
        if (location) query.location = new RegExp(location, 'i');
        if (category) query.category = category;
        if (minPay) query.pay = { ...query.pay, $gte: minPay }; 
        if (maxPay) query.pay = { ...query.pay, $lte: maxPay }; 

        const jobs = await Job.find(query);
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
