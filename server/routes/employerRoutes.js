const express = require('express');
const router = express.Router();
const employerController = require('../controllers/employerController');

router.get('/', employerController.getAllEmployers);
router.post('/', employerController.createEmployer);
router.get('/:id/positions', employerController.getAllPositions);
router.post('/jobs/:id', employerController.addJob);
router.delete('/jobs/:id', employerController.deleteJob);

router.get('/:id', employerController.getEmployerById);
router.put('/:id', employerController.updateEmployer);
router.delete('/:id', employerController.deleteEmployer);
router.get('/jobs', employerController.getAllJobs);
router.get('/jobs/:id', employerController.getJobById);
router.put('/jobs/:id', employerController.updateJob);

module.exports = router;
