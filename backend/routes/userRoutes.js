const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const { signup, login } = require('../controllers/authController');


router.post('/login', login);


router.post('/signup', signup);

module.exports = router;
