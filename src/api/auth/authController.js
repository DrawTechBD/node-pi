const AuthService = require('./authService');
const catchAsync = require('../error/catchAsync')
const {body, validationResult} = require("express-validator");
const Controller = require("../../helper/Controller");

class AuthController extends Controller {

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
  register = async (req, res) => this.request(req, res, () =>
    AuthService.register(req.body));

  /**
   * Register or Login via Social Auth
   * @param req
   * @param {String} req.body.idToken - Social auth token
   * @param res
   * @returns {UserModel|Error}
   */
  social = async (req, res) => this.request(req, res, async () =>
    AuthService.social(req.body.idToken));

  /**
   * Login user
   * @param req
   * @param {Object} req.body - Form Data
   * @param {String} req.body.email - Email
   * @param {String} req.body.password - Password
   * @param res
   * @returns {UserModel|Error}
   */
  login = (req, res) => this.request(req, res, async () =>
    AuthService.login(req.body));

  /**
   * Validate token
   * @param req
   * @param {UserModel} req.user - User Decoded from Bearer token
   * @param {String} req.user._id - User id
   * @param res
   * @returns {UserModel|Error}
   */
  authenticate = (req, res) => this.request(req, res, () =>
    AuthService.authenticate(req.user._id));

  /**
   * Request for a password reset
   * @param req
   * @param {Object} req.body - Form Data
   * @param {String} req.body.email - Email
   * @param res
   * @returns {Promise<void>}
   */
  requestPassReset = (req, res) => this.request(req, res, () =>
    AuthService.requestPassReset(req.body));

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
  resetPassword = (req, res) => this.request(req, res, () =>
    AuthService.verifyPassReset(req.query, req.body));
}

module.exports = new AuthController();
