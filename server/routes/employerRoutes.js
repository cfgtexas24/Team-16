const express = require('express');
const router = express.Router();
const employerController = require('../controllers/employerController');

router.get('/', employerController.getAllEmployers);
router.post('/', employerController.createEmployer);
router.get('/:id/positions', employerController.getAllPositions);
router.post('/:id/jobs', employerController.addJob);


module.exports = router;
