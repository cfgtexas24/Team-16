const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

router.post('/:employerId', jobController.addJob);
router.get('/:id', jobController.getJobById);
router.post('/createJob', jobController.createJob);
router.get('/getJobs', jobController.getAllJobs);
router.post('/updateJobs', jobController.updateJob);
router.delete('/deleteJobs', jobController.deleteJob);
router.post('/searchBySkill',jobController.searchJobsByCategory);

module.exports = router;

