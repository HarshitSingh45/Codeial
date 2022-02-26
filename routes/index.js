const express = require('express');
const router = express.Router();
const passport = require('passport');

const homeController = require('../controllers/homeController');
router.get('/', homeController.home );
router.use('/posts', require('./posts'));
router.use('/users', require('./users'));
router.use('/comments', require('./comments'));

console.log("Router Loaded");
module.exports = router;