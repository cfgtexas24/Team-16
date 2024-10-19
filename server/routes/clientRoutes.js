const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

router.post('/', clientController.createClient);
router.post('/login', clientController.loginClient);
router.post('/getJobs', clientController.getJobs);
router.post('/editProfile', clientController.editProfile);
router.get('/profile', clientController.getProfile); // New route for getting profile
module.exports = router;
