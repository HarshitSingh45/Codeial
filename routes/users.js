const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersControllers');
router.get('/profile', userController.user);
module.exports = router;