const express = require('express');
const router = express.Router();
const employerController = require('../controllers/employerController');

router.get('/', employerController.getAllEmployers);
router.post('/', employerController.createEmployer);


module.exports = router;
