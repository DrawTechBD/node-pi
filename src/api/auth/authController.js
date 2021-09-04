const AuthService = require('./authService');
const catchAsync = require('../error/catchAsync')
const {body, validationResult} = require("express-validator");

class AuthController {
    // Social Auth
    social = catchAsync(async (req, res, next) => {
        const {idToken} = req.body;
        const data = await AuthService.social(idToken);
        res.json(data);
    });

// Register user
    register = catchAsync(async (req, res, next) => {
        const data = await AuthService.register(req.body);
        res.json(data);
    });



// Login user
    login = catchAsync(async (req, res, next) => {
        const data = await AuthService.login(req.body);
        res.json(data);
    });

// Validate token
    authenticate = async (req, res) => {
        try{
            console.log("Requested");
            const data = await AuthService.authenticate(req.user._id);
            res.json(data);
        } catch(e){
            console.log(e);
        }
    };

// Request for a password reset
    requestPassReset = catchAsync(async (req, res, next) => {
        const data = await AuthService.requestPassReset(req.body);
        res.json(data);
    });

// Reset password
    resetPassword = catchAsync(async (req, res, next) => {
        await AuthService.verifyPassReset(req.query, req.body);
        res.json();
    });

    // // Validate routes
    // validate = (method) => {
    //     switch (method) {
    //         case 'social':
    //             return [];
    //         case 'register':
    //             return [
    //                 body('email', 'Invalid email').exists().isEmail(),
    //                 body('name', 'Invalid name').exists(),
    //                 body('password', 'Invalid password').exists().isStrongPassword(),
    //             ];
    //         case 'login':
    //             return [];
    //         case 'requestPassReset':
    //             return [];
    //         case 'resetPassword':
    //             return [];
    //     }
    // }
}

module.exports = new AuthController();
