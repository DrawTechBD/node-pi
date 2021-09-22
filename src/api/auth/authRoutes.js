const express = require('express');
const router = express.Router();
const passport = require('passport');
const {body, validateResult} = require('express-validator');

const authController = require('./authController');

// Social Auth Route
router.post('/social', authController.social);

// Register User
router.post('/register', authController.register);

// Authenticate token
router.post('/authenticate',
    passport.authenticate("jwt", {session: false}),
    authController.authenticate
);

// Login User
router.post('/login', authController.login);

// Request for a password reset
router.post('/request-pass-reset', authController.requestPassReset);

// Change a password
router.post('/reset-password', authController.resetPassword);




module.exports=router;
