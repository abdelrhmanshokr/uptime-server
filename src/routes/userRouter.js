const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/signup', userController.user_signup);
router.post('/login', userController.user_login);
router.post('/verify-account', userController.verify_account);


module.exports = router;

