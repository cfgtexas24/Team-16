# Team-16

## High-Level Overview
The platform will be a responsive web app that:

Connects students with potential employers.
Provides career resources like resume uploads, ATS (Applicant Tracking System), and training courses.
Allows students to get matched with internships and job opportunities.
Fosters peer support and mentorship with features for alumni and study buddies.

## Core Features:
User Profiles: Students and alumni create profiles, upload resumes, and enter job-related qualifications.
Job Matching & ATS: Students can search or get matched with jobs based on their qualifications.
Career Resources: Offers free training courses and certifications, especially in high-demand fields like tech.
Peer Support: A forum for students to interact, form study groups, and get mentorship from alumni.
Employer Dashboard: Employers post job listings and track student applications.
Tracking System: REE administrators can track the progress of students, mentor involvement, and job placements.

## System Design
### Front-End (React):
Student Dashboard: Displays job matches, career progress, and certifications.
Employer Dashboard: Lets employers post jobs, review applications, and track the recruitment process.
Training Module: Provides access to training resources, certifications, and quizzes to track skill development.
Mentorship Forum: Connects students with alumni and mentors for advice, group study, and interview preparation.

### Back-End (Node.js & Express.js):
API: Handles all data requests between the front-end and back-end (RESTful services).
Authentication: Manages user registration, login, and permissions (student, admin, employer).
Database (MongoDB): Stores user profiles, job listings, certifications, and progress data.
Resume Upload & ATS: Allows students to upload resumes and provides a matching system for job listings.
Database (MongoDB):
User Collection: Stores user data (name, email, profile info, role).
Job Collection: Stores job postings and employer information.
Resume Collection: Stores resumes uploaded by students.
Course Collection: Stores courses and certifications available on the platform.
Mentorship Collection: Stores mentor-mentee relationships, alumni involvement.

### Pseudocode Examples
### User Registration
// POST /api/register
app.post('/api/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  
  // Hash password for security
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user document
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role  // 'student', 'employer', or 'admin'
  });

  // Save to database
  await newUser.save();
  
  res.status(201).json({ message: 'User created successfully!' });
});

### Job Matching Algorithm
// POST /api/job-matches
app.post('/api/job-matches', async (req, res) => {
  const { studentId } = req.body;

  // Fetch student qualifications
  const student = await User.findById(studentId);
  const qualifications = student.qualifications;

  // Fetch jobs matching the qualifications
  const matchedJobs = await Job.find({
    qualifications: { $in: qualifications }
  });

  res.json({ jobs: matchedJobs });
});

### Course Tracking
// POST /api/complete-course
app.post('/api/complete-course', async (req, res) => {
  const { userId, courseId } = req.body;

  // Find the user and add the course to their completed courses
  await User.updateOne({ _id: userId }, { $push: { completedCourses: courseId } });

  res.json({ message: 'Course completed successfully!' });
});

### Flowchart
Here’s a simple flowchart of how a student would interact with the platform:
[User Registration/Login] --> [User Dashboard] --> [Upload Resume / Input Qualifications] --> 
   --> [Search Jobs] --> [ATS Matches Job Listings] --> [Apply for Job]
       --> [Training Modules] --> [Complete Courses] --> [Track Progress]

### Mentorship Interaction:
[Mentor/Alumni Login] --> [Access Forum] --> [Connect with Students] --> [Provide Guidance/Feedback]

### Employer Interaction:
[Employer Login] --> [Post Jobs] --> [Review Applications] --> [Track Applicants]

### Technology Stack
Frontend: React for building a dynamic user interface and user-friendly experience.
Backend: Node.js with Express.js to handle API requests and manage authentication.
Database: MongoDB for storing user profiles, job listings, resumes, certifications, and tracking progress.
Authentication: JWT (JSON Web Tokens) for secure login and session management.
File Uploads: Multer library in Node.js to handle resume uploads.
Job Matching: Basic matching algorithm that cross-references student qualifications with job requirements.
