const express = require('express');
const router = express.Router();

const frienshipController = require('../controllers/friendship');
router.get('/friend/:id', frienshipController.addFriend);

module.exports = router;
