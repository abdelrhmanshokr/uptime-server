const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const expressValidator = require('../userInputValidation/userValidation');


/**
 * @swagger
 * /api/users/signup:
 *  post:
 *    description: Use to sign a new user up to the system
 *    tags:
 *      - users
 *    parameters:
 *      - name: reqBody
 *        description: request body 
 *        in: body
 *        schema:
 *          type: object
 *          properties:
 *               username: 
 *                  type: string
 *               email:
 *                  type: string
 *               password:
 *                  type: string
 *          required:
 *              - username
 *              - email
 *              - password
 *    responses:
 *      '200':
 *        description: Successfully created a new user
 */
router.post('/signup', expressValidator.validate('user_signup'), userController.user_signup);


/**
 * @swagger
 * /api/users/login:
 *  post:
 *    description: Use to login a user with username, password and email
 *    tags:
 *      - users
 *    parameters:
 *      - name: reqBody
 *        description: request body 
 *        in: body
 *        schema:
 *          type: object
 *          properties:
 *               email:
 *                  type: string
 *               password:
 *                  type: string
 *          required:
 *              - email
 *              - password
 *    responses:
 *      '200':
 *        description: Successfully loggedin
 */
router.post('/login', expressValidator.validate('user_login'), userController.user_login);


router.post('/verify-account', expressValidator.validate('verify_account'), userController.verify_account);


module.exports = router;

