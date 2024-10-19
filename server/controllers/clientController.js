const Client = require('../models/clientModel');
const jwt = require('jsonwebtoken')
const Job = require('../models/jobModel');
require('dotenv').config()
// Create a new employer
exports.createClient = async (req, res) => {
    try {
      const newClient = new Client({email: req.body.email, password: req.body.password});
      await newClient.save();
      res.status(201).json(newClient);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };


exports.loginClient = async (req, res) => {
    const {email, password} = req.body
    
    try {
        const client = await Client.findOne({email: email})
        if (!client) {
            return res.status(400).json({error: "User not found"})
        }
        const isMatch = await client.comparePassword(password)
        if (!isMatch) {
            return res.status(401).json({error: "Incorrect password"})
        }
        const token = jwt.sign({
            email: client.email,
            user: "client",
            name: client.name
        },
        process.env.token

    )
        
        
        return res.json({status: 200, token: token})
    } catch(err){
        res.json(500).json({error: "Server error"})
    }
}


exports.editProfile = async (req, res) => {
    const { email, password, skills, applied, phone, linkedin, experiences, name } = req.body;

    try {
        // Find the client by email
        const client = await Client.findOne({ email });

        if (!client) {
            return res.status(404).json({ error: "User not found" });
        }

        // Update fields only if they are provided
        if (password) client.password = password;
        if (skills) client.skills = skills; // Ensure skills is updated appropriately
        if (applied) client.applied = applied; // Update applied jobs if provided
        if (phone) client.phone = phone;
        if (linkedin) client.linkedin = linkedin;
        if (experiences) client.experiences = experiences;
        if (name) client.name = name;

        // Save the updated client document
        await client.save();

        res.status(200).json({ message: "Profile updated successfully", client });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

exports.getJobs = async (req, res) => {
    const { email } = req.body;

    try {
        const client = await Client.findOne({ email: email });
        
        if (!client) {
            return res.status(400).json({ error: "User not found" });
        }

        // Initialize an array to hold job results
        const jobResults = [];

        // Iterate through client.skills
        for (const skill of client.skills.values()) {
            // Here you would typically call your job API or database to fetch jobs for the skill
            // For example:
            const jobsForSkill = await fetchJobsByCategory(skill); // Assume this is a function you create

            jobResults.push({
                skill: skill,
                jobs: jobsForSkill
            });
        }

        res.status(200).json(jobResults);
        
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: "Server error" });
    }
};

async function fetchJobsByCategory(category) {
    try {
        // Query the Job model for jobs that match the specified category
        const jobs = await Job.find({ category });

        return jobs; // Return the found jobs
    } catch (error) {
        console.error(`Error fetching jobs for category "${category}":`, error);
        throw new Error('Failed to fetch jobs'); // Throw error to be handled in the controller
    }
}

exports.getClientApplications = async (req, res) => {
    const { email } = req.body;

    try {
        const client = await Client.findOne({ email: email });
        
        if (!client) {
            return res.status(400).json({ error: "User not found" });
        }

        // Assuming 'applied' is an array of applications stored in the client document
        const applications = client.applied || []; // Default to an empty array if no applications

        res.status(200).json({ applications }); // Return the applications

    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: "Server error" });
    }
};

exports.createClientApplications = async (req, res) => {
    const { email, jobId } = req.body;

    try {
        const client = await Client.findOne({ email: email });
        
        if (!client) {
            return res.status(400).json({ error: "User not found" });
        }

        // Create a new application object
        const newApplication = {
            job_id: jobId, // Use the provided jobId
            status: 'In progress' // Default status can be 'applied', change as needed
        };

        // Push the new application into the client's applied array
        client.applied.push(newApplication);

        // Save the updated client document
        await client.save();

        res.status(200).json({ message: "Application submitted successfully", applications: client.applied });

    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: "Server error" });
    }
};

exports.reviewResume = async (req, res) => {
    const { resumeText } = req.body;
    const { OPENAI_API_KEY } = process.env;

    if (!resumeText) {
        return res.status(400).json({ error: 'Resume text is required.' });
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: 'You are a resume reviewer. Provide detailed feedback on resumes.' },
                    { role: 'user', content: `Please review the following resume:\n\n${resumeText} }` }
                  ]
            })
        });

        if (!response.ok) {
            throw new Error('Failed to get a response from the API');
        }

        const data = await response.json();
        const review = data.choices[0].message.content;
        res.json({ review });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while reviewing the resume.' });
    }
};

exports.coverLetter = async (req, res) => {
    const { jobTitle, companyName, applicantName, skills } = req.body;

    if (!jobTitle || !companyName || !applicantName || !skills) {
        return res.status(400).json({ error: 'All fields are required: jobTitle, companyName, applicantName, and skills.' });
    }
    
    const { OPENAI_API_KEY } = process.env;

    try {
        const prompt = `Write a professional cover letter for a job application. 
        The applicant's name is ${applicantName}, applying for the position of ${jobTitle} at ${companyName}. 
        Mention the following skills: ${skills}. 
        Make sure the tone is professional and engaging.`;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'You are an assistant that generates cover letters.' },
                    { role: 'user', content: prompt }
                ]
            })
        });

        if (!response.ok) {
            throw new Error('Failed to get a response from the API');
        }

        const data = await response.json();
        const coverLetter = data.choices[0].message.content;
        res.json({ coverLetter });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while generating the cover letter.' });
    }
};