const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const Client = require('../models/clientModel');
const Job = require('../models/jobModel');
const { computeUseSimilarity } = require('../utils/similarity'); // Updated import

// router.post('/testSimilarity', async (req, res) => {
//     try {
//         console.log("Inside /testSimilarity");

//         // Reference existing job and client by their IDs
//         const jobId = '67136b1c86d4826274595f91';
//         const clientId = '';

//         // Fetch the job and client data
//         const job = await Job.findById(jobId);
//         const client = await Client.findById(clientId);

//         if (!job || !client) {
//             return res.status(404).json({ message: 'Job or Client not found' });
//         }

//         // Concatenate only skills and experiences into a single string for comparison
//         const clientData = client.skills.join(' ') + ' ' + client.experiences.map(exp => Object.values(exp).join(' ')).join(' ');

//         // Compute similarity score using Universal Sentence Encoder embeddings
//         const similarityScore = await computeUseSimilarity(job.description, clientData);
//         console.log("Similarity Score:", similarityScore);

//         res.status(200).json({ similarityScore });
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ message: error.message });
//     }
// });

router.post('/:employerId', jobController.addJob);
router.get('/:id', jobController.getJobById);
router.get('/getJobs', jobController.getAllJobs);
router.post('/updateJobs', jobController.updateJob);
router.delete('/deleteJobs', jobController.deleteJob);
router.post('/searchBySkill',jobController.searchJobsByCategory);
router.post('/similarity/:jobId/:clientId', async (req, res) => {
    try {

        // Extract jobId and clientId from the request parameters
        const { jobId, clientId } = req.params;

        // Fetch the job and client data
        const job = await Job.findById(jobId);
        const client = await Client.findById(clientId);

        if (!job || !client) {
            return res.status(404).json({ message: 'Job or Client not found' });
        }

        // Concatenate only skills and experiences into a single string for comparison
        const clientData = client.skills.join(' ') + ' ' + client.experiences.map(exp => Object.values(exp).join(' ')).join(' ');

        // Compute similarity score using Universal Sentence Encoder embeddings
        const similarityScore = await computeUseSimilarity(job.description, clientData);
        console.log("Similarity Score:", similarityScore);

        res.status(200).json({ similarityScore });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;
