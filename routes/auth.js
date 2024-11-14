const express = require('express');
const router = express.Router();
const { signup, signin} = require('./../controllers/authcontroller');

// Sign-up Route
router.post('/signup', signup);
// Sign-in Route
 router.post('/signin', signin)
module.exports = router;