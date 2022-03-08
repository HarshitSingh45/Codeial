const express = require('express');
const router = express.Router();
const passport = require('passport');
const postApi = require('../../../controllers/api/v1/posts_api');

router.get('/', postApi.index);
router.delete('/:id', passport.authenticate('jwt', {session: false}) , postApi.destroy);
// we have made session to be false because we dont want the session cookies to be created

module.exports = router;