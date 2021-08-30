const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const expressValidator = require('../validation/userValidation');


router.post('/signup', expressValidator.validate('user_signup'), userController.user_signup);
router.post('/login', expressValidator.validate('user_login'), userController.user_login);
router.post('/verify-account', expressValidator.validate('verify_account'), userController.verify_account);


module.exports = router;

