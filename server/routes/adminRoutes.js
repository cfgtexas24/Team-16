const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');


router.post('/login', adminController.loginAdmin);
router.post('/',adminController.createAdmin)


module.exports = router;