const { body } = require('express-validator/check');


exports.validate = (method) => {
    switch (method){
        case 'user_signup': {
            return [
                body('username', 'Username is required, And it can not start with an integer').trim().not().isInt().not().isEmpty(),
                body('password', 'Passowrd is required').trim().not().isEmpty(),
                body('email', 'Email is required').trim().isEmail().not().isEmpty()
            ]
        }
        case 'verify_account': {
            return [
                body('verificationToken', 'Token expired or invalid').not().isEmpty()
            ]
        }
        case 'user_login': {
            return [
                body('email', 'Email is required').trim().isEmail().not().isEmpty(),
                body('password', 'Password is required').trim().not().isEmpty()
            ]
        }
    }
}


