const AuthService = require('./authService');
const catchAsync = require('../error/catchAsync')
const {body, validationResult} = require("express-validator");

class AuthController {
    /**
     * Register or Login via Social Auth
     * @param req
     * @param {String} req.body.idToken - Social auth token
     * @param res
     * @returns {UserModel|Error}
     */
    social = async (req, res) => {
        try {
            const {idToken} = req.body;
            const data = await AuthService.social(idToken);
            res.json(data);
        } catch (e) {
            console.log(e);
            res.status(500).json(e);
        }
    }


    /**
     * Register user
     * @param req
     * @param {Object} req.body - Form Data
     * @param {String} req.body.name - Name of user
     * @param {String} req.body.email - Email of user
     * @param {String} req.body.password - Password of user
     * @param res
     * @returns {UserModel|Error}
     */
    register = async (req, res) => {
        try {
            const data = await AuthService.register(req.body);
            res.json(data);
        } catch (e) {
            console.log(e);
            res.status(500).json(e);
        }
    }


    /**
     * Login user
     * @param req
     * @param {Object} req.body - Form Data
     * @param {String} req.body.email - Email
     * @param {String} req.body.password - Password
     * @param res
     * @returns {UserModel|Error}
     */
    login = async (req, res) => {
        try {
            const data = await AuthService.login(req.body);
            res.json(data);
        } catch (e) {
            console.log(e);
            res.status(500).json(e);
        }
    }

    /**
     * Validate token
     * @param req
     * @param {UserModel} req.user - User Decoded from Bearer token
     * @param {String} req.user._id - User id
     * @param res
     * @returns {UserModel|Error}
     */
    authenticate = async (req, res) => {
        try {
            console.log("Requested");
            const data = await AuthService.authenticate(req.user._id);
            res.json(data);
        } catch (e) {
            console.log(e);
            res.status(500).json(e);
        }
    };

    /**
     * Request for a password reset
     * @param req
     * @param {Object} req.body - Form Data
     * @param {String} req.body.email - Email
     * @param res
     * @returns {Promise<void>}
     */
    requestPassReset = async (req, res) => {
        try {
            const data = await AuthService.requestPassReset(req.body);
        res.json(data);
        } catch (e) {
            console.log(e);
            res.status(500).json(e);
        }
    };

    /**
     * Reset password
     * @param req
     * @param {Object} req.query - Query Params
     * @param {String} req.query.userId - User ID
     * @param {String} req.query.token - Token to change password
     * @param {Object} req.body - Form data
     * @param {String} req.body.email - User Email
     * @param {String} req.body.password - New password
     * @param res
     * @returns {Promise<void>}
     */
    resetPassword = async (req, res) => {
        try {
            await AuthService.verifyPassReset(req.query, req.body);
        res.json();
        } catch (e) {
            console.log(e);
            res.status(500).json(e);
        }
    };
}

module.exports = new AuthController();
