const express = require('express');
const router = express.Router();
const caseManagerController = require('../controllers/caseManagerController');


router.post('/login', caseManagerController.logincaseManager);



module.exports = router;