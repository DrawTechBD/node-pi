const AuthService = require('./authService');

class AuthController {
  // Social Auth
  social = async (req, res) => {
    try {
      const {idToken} = req.body;
      const user = await AuthService.social(idToken);
      return res.json(user);
    } catch (e) {
      return res.status(401).json("Unauthenticated");
    }
  }

// Register user
  register = async function (req, res) {
    try {
      const data = await AuthService.register(req.body);
      return res.json(data);
    } catch (e) {
      return res.status(400).json(e);
    }
  }

// Login user
  login = async function (req, res) {
    try {
      const data = await AuthService.login(req.body);
      return res.json(data);
    } catch (e) {
      return res.status(400).json(e);
    }
  }

// Verify token
  authenticate = async function (req, res) {
    try {
      const data = await AuthService.authenticate(req.user._id);
      return res.json(data);
    } catch (e) {
      return res.status(400).json(e);
    }
  }

// Request for a password reset
  requestPassReset = async function (req, res) {
    try {
      await AuthService.requestPassReset(req.body.email);
    } catch (e) {
      return res.status(400).json(e);
    }
  }

// Reset password
  resetPassword = async function (req, res) {
    try {
      await AuthService.verifyPassReset(req.query.userId, req.body);
      return res.status(200);
    } catch (e) {
      console.log(e);
      return res.status(400).json(e);
    }
  }
}

module.exports = new AuthController();
