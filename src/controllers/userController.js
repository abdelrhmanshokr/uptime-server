const User = require('../models/userModel');
const { validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mailgun = require('mailgun-js');
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = mailgun({ apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN });
require('dotenv').config();


exports.user_signup = async(req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json(errors.array());
        }

        let user = await User.findOne({ email: req.body.email });
        if(user){
            return res.status(400).json(
                'This email is already in use please try again with another email'
            );
        }else{
            const accountVerificationToken = jwt.sign(
                {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                },
                process.env.VERIFICATION_JWT_TOKEN_SECRET,
                { expiresIn: '20m'}
            );

            // email verfication using mailgun 
            const data = {
                from: 'no-reply@corp.com',
                to: req.body.email,
                subject: 'Account verification',
                html: `
                    <h2> Please follow this link to verify your account </h2>
                    <p><a href='#'>http://localhost:${process.env.PORT}/verify-account/${accountVerificationToken}</a></p>
                    `
            };
            mg.messages().send(data, (error, body) => {
                if(error){
                    return res.status(401).json(error.message);
                }
                return res.status(200).json('An email was sent please check your inbox');
            });
        }
    }catch(err){
        return res.status(400).json(err.message);
    }
}


exports.verify_account = async(req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json(errors.array());
        }

        const verificationToken = req.body.verificationToken;
        if(!verificationToken){
            return res.status(401).json('Token expired or invalid');
        }else{
            const decodedToken = jwt.verify(verificationToken, process.env.VERIFICATION_JWT_TOKEN_SECRET)
            if(!decodedToken){
                return res.status(401).json('User could not be created');
            }else{
                const user = await User.findOne({ email: decodedToken.email });
                if(user){
                    return res.status(400).json(
                        'This email is already in use please try again with another email'
                    );
                }else{
                    let hashedpassword = await bcrypt.hash(decodedToken.password, 10);
                    let newUser = new User({
                        username: decodedToken.username,
                        email: decodedToken.email,
                        password: hashedpassword
                    });
                    await newUser.save();
                    return res.status(201).json('User created successfully');
                }
            }
        }
    }catch(err){
        return res.status(401).json(err.message);
    }
}


exports.user_login = async(req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(401).json(errors.array());
        }

        let user = await User.findOne({ email: req.body.email });
        if(!user){
            return res.status(401).json('This email is not associated with any user');
        }else{
            let isPasswordValid = await bcrypt.compare(req.body.password, user.password);
            if(!isPasswordValid) throw new Error('Login failed');

            let token = jwt.sign(
                {
                    username: user.username,
                    email: user.email,
                    _id: user._id
                },
                process.env.LOGIN_JWT_TOKEN_SECRET,
                { expiresIn: '24h' }
            );

            return res.status(200).json({ token });
        }
    }catch(err){
        res.status(500).json(err.message);
    }
}