const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const authConfig = require("../../config/auth.config");
const UserModel = require("../user/userModel");
const utils = require("../../helper/utils");
const moment = require("moment");
const UserValidator = require("../user/userValidator");
const gravatar = require("gravatar");
const UserService = require("../user/userService");
const bcrypt = require("bcryptjs");
const TokenModel = require("../token/tokenModel");
const crypto = require("crypto");

const emailHandler = require("../../views/emails/emailHandler");
const {isEmpty} = require("../../helper/utils");
const {isEmail} = require("validator");

dotenv.config();

const secret_key = process.env.JWT_TOKEN;
const expiresIn = process.env.JWT_EXPIRES_IN;
const bcryptSalt = parseInt(process.env.BCRYPT_SALT);
const clientUrl = process.env.CLIENT_URL;

class AuthService {
  /**
   * @param {object} form
   * @param {String} form.name
   * @param {String} form.email
   * @param {String} form.password
   * @returns {Promise<UserModel|Error>}
   */
  register = async (form) => {
    let {errors, isValid} = await UserValidator.validateRegisterInput(form);
    if (!isValid) throw {
      ...errors,
      status: 400,
    };

    const avatar = gravatar.url(form.email, {
      s: "200",
      r: "pg",
      d: "mm",
    });
    const newUser = new UserModel({
      name: form.name,
      email: form.email,
      password: form.password,
      avatar: avatar,
      expiresIn: this.getExpiresIn()
    });
    newUser.token = this.getToken(newUser);
    return await newUser.save();
  }

  /**
   * @param {Object} form
   * @param {String} form.email
   * @param {String} form.password
   * @returns {Promise<UserModel|Error>}
   */
  login = async (form) => {
    console.log(`Authenticating user ${JSON.stringify(form)}`);

    // Validate input
    const {errors, isValid} = UserValidator.validateLoginInput(form);
    if (!isValid) throw errors;

    // Get user from database
    const user = await UserService.showWithPassword(form.email);

    // throw if unknown user
    if (!user) throw {email: "Email does not exist!"};

    // Check for password match
    const doMatch = await bcrypt.compare(form.password, user.password);
    if (!doMatch) throw {password: "Invalid password!"};

    // token
    user.token = this.getToken(user);
    user.expiresIn = this.getExpiresIn();
    user.save();
    delete user._doc.password;
    return user;
  }

  /**
   * @param {String} _id - User ID
   * @returns {Promise<UserModel>}
   */
  authenticate = async (_id) => {
    // Find user with ID
    const user = await UserModel.findOne({_id});
    console.log(user.email);

    // Update expiresIn
    user.expiresIn = this.getExpiresIn();
    await user.save();

    // Return updated user;
    return await UserService.show(_id);
  }

  /**
   * @param {String} idToken
   * @returns UserModel
   */
  social = async (idToken) => {
    const decodedToken = await authConfig.admin.auth().verifyIdToken(idToken);
    let user = await UserModel.findOne().or([
      {name: decodedToken.name},
      {email: decodedToken.email},
      {phone: decodedToken.phone_number}
    ]);
    console.log(`User ${user}`);
    if (user == null) {
      user = new UserModel({
        name: decodedToken.name,
        email: decodedToken.email,
        phone: decodedToken.phone_number,
        avatar: decodedToken.picture,
      });
    } else {
      if (utils.isEmpty(user.name) && !utils.isEmpty(decodedToken.name)) user.name = decodedToken.name;
      if (utils.isEmpty(user.email) && !utils.isEmpty(decodedToken.email)) user.email = decodedToken.email;
      if (utils.isEmpty(user.phone) && !utils.isEmpty(decodedToken.phone_number)) user.phone = decodedToken.phone_number;
      if (utils.isEmpty(user.avatar) && !utils.isEmpty(decodedToken.picture)) user.avatar = decodedToken.picture;
    }
    user.token = await this.getToken(user);
    user.expiresIn = this.getExpiresIn();
    return await user.save();
  }

  /**
   * @param {Object} form - form data
   * @param {String} form.email
   * @returns {Promise}
   */
  requestPassReset = async (form) => {
    const {email} = form;
    if (isEmpty(email)) throw {email: "Email not found!"};
    if (!isEmail(email)) throw {email: "Invalid email"};

    // Find user
    const user = await UserModel.findOne({email});
    if (!user) throw {email: "Email does not exist!"};

    // Check if token already used
    let token = await TokenModel.findOne({userId: user._id});
    if (token) await token.deleteOne();

    // Create token
    let resetToken = crypto.randomBytes(32).toString('hex');
    const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));
    await new TokenModel({
      userId: user._id,
      token: hash,
      createdAt: Date.now(),
    }).save();

    const link = `${clientUrl}/view/password-reset?token=${resetToken}&userId=${user._id}`;
    await emailHandler.sendEmail(user.email, "Password Reset Request", {
      name: user.name,
      link,
    }, emailHandler.REQUEST_RESET_PASSWORD);
  }

  /**
   * @param query
   * @param query.userId
   * @param query.token
   * @param form
   * @param form.email
   * @param form.password
   * @returns {Promise}
   */
  verifyPassReset = async (query, form) => {
    const {email, password} = form;
    const {userId, token} = query;
    // Validate data
    if (isEmpty(email)) throw {email: "Email field is required"};
    if (!isEmail(email)) throw {email: "Invalid email"};

    if (isEmpty(password)) throw {password: "Password required"};
    if (isEmpty(token)) throw {token: 'Token required'};

    // Verify token
    const passwordResetToken = await TokenModel.findOne({userId});
    if (!passwordResetToken) throw {token: "Invalid or expired password reset token"};
    const isValid = await bcrypt.compare(form.token, passwordResetToken.token);
    if (!isValid) throw {token: "Invalid or expired password reset token"};

    // Validate token
    const hash = await bcrypt.hash(form.password, Number(bcryptSalt));

    // Update password
    await UserModel.updateOne({_id: userId}, {$set: {password: hash}}, {new: true});

    // Remove the token
    await passwordResetToken.deleteOne();

    // Send email for Successful password reset
    const user = await UserModel.findById({_id: userId});
    await emailHandler.sendEmail(user.email, "Password reset successful", {name: user.name}, emailHandler.RESET_PASSWORD);
  }

  /**
   * @param {UserModel} user
   * @returns {String} - token
   */
  getToken = (user) => jwt.sign({
    _id: user._id,
    email: user.email,
    // password: user.password,
    isAdmin: user.isAdmin,
    iat: new Date().getTime(),
    // exp: new Date().setDate(new Date().getDate() + 7),
  }, secret_key, {expiresIn: '7d'});

  /**
   * @return expires in n days
   */
  getExpiresIn = () => moment().add(expiresIn.toString(), 'days').toString()

}

module.exports = new AuthService();
