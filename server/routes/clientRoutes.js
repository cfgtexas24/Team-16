const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

router.post('/', clientController.createClient);
router.post('/login',clientController.loginClient)
router.post('/getJobs',clientController.getJobs)
router.post('/editProfile', clientController.editProfile)
router.post('/getApplications',clientController.getClientApplications)
router.post('/createApplication', clientController.createClientApplications)
router.post('/reviewResume', clientController.reviewResume)
router.post('/coverLetter', clientController.coverLetter)
module.exports = router;