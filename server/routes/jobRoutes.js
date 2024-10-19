const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const Client = require('../models/clientModel');
const Job = require('../models/jobModel');


router.post('/', jobController.addJob);
router.get('/jobs/:id', jobController.getJobById);
router.get('/getJobs', jobController.getAllJobs);
router.post('/updateJobs', jobController.updateJob);
router.delete('/deleteJobs', jobController.deleteJob);
router.post('/searchBySkill',jobController.searchJobsByCategory);



module.exports = router;
