const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersControllers');
router.get('/profile', userController.user);
router.get('/signup',userController.signup);
router.get('/signin',userController.signin);
module.exports = router;