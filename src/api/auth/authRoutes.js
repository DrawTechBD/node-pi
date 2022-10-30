const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('./authController');
const {authenticate} = require("../../helper/utils");
/**
 * Authentication API
 *
 * Prefix - /api/auth
 */

// Register User
router.post('/register', authController.register);

// Social Auth Route
router.post('/social', authController.social);

// Authenticate token
router.post('/authenticate', authenticate, authController.authenticate);

// Login User
router.post('/login', authController.login);

// Request for a password reset
router.post('/request-pass-reset', authController.requestPassReset);

// Change a password
router.post('/reset-password', authController.resetPassword);


module.exports = router;
