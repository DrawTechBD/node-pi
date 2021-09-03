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

dotenv.config();

const secret_key = process.env.JWT_TOKEN;
// const expiresIn = process.env.JWT_EXPIRES_IN;
const bcryptSalt = parseInt(process.env.BCRYPT_SALT);
const clientUrl = process.env.CLIENT_URL;

class AuthService {
  /**
   * @param form: UserModel
   * @returns {Promise<UserModel>}
   */
  register = async (form) => {
    let {errors, isValid} = await UserValidator.validateRegisterInput(form);
    if (!isValid) throw errors;

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
      expiresIn: moment().add(7, 'days').toString()
    });
    newUser.token = await this.getToken(newUser);
    return await newUser.save();
  }

  /**
   * @param form: UserModel
   * @returns {Promise<UserModel>}
   */
  login = async(form) => {
    // Validate input
    const {errors, isValid} = UserValidator.validateLoginInput(form);
    if(!isValid) throw errors;

    // Get user from database
    const user = await UserService.showWithPassword(form.email);

    // throw if unknown user
    if (!user) throw {email: "Email does not exist!"};

    // Check for password match
    const doMatch = await bcrypt.compare(form.password, user.password);
    if (!doMatch) throw {password: "Invalid password!"};

    // token
    user.token = await this.getToken(user);
    user.expiresIn = moment().add(7, 'days').toString();
    user.save();
    delete user._doc.password;
    return user;
  }

  /**
   * @param _id: String
   * @returns {Promise<UserModel>}
   */
  authenticate = async(_id) => {
    // Find user with ID
    const user = await UserModel.findOne({_id});

    // Update expiresIn
    user.expiresIn = moment().add(7, 'days').toString();
    await user.save();

    // Return updated user;
    return await UserService.show(_id);
  }

  /**
   * @param idToken: String
   * @returns UserModel
   */
  social =  async (idToken, ) =>{
    const decodedToken = await authConfig.admin.auth().verifyIdToken(idToken);
    let user = await UserModel.findOne().or([
      {name: decodedToken.name},
      {email: decodedToken.email},
      {phone: decodedToken.phone_number}
    ]);
    console.log(`User ${user}`);
    if(user == null) {
      user = new UserModel({
        name: decodedToken.name,
        email: decodedToken.email,
        phone: decodedToken.phone_number,
        avatar: decodedToken.picture,
      });
    } else {
      if(utils.isEmpty(user.name) && !utils.isEmpty(decodedToken.name)) user.name = decodedToken.name;
      if(utils.isEmpty(user.email) && !utils.isEmpty(decodedToken.email)) user.email = decodedToken.email;
      if(utils.isEmpty(user.phone) && !utils.isEmpty(decodedToken.phone_number)) user.phone = decodedToken.phone_number;
      if(utils.isEmpty(user.avatar) && !utils.isEmpty(decodedToken.picture)) user.avatar = decodedToken.picture;
    }
    user.token = await this.getToken(user);
    user.expiresIn = moment().add(7, 'days').toString();
    return  await user.save();
  }

  /**
   * @param email: String
   * @returns {Promise<void>}
   */
  requestPassReset = async (email) => {
    // check for data
    if (email === null || email === "") throw{email: "Enter your email first!"};

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

    // const link = `${clientUrl}/auth/reset-password?token=${resetToken}&userId=${user._id}`;
    await emailHandler.sendEmail(user.email, "Password Reset Request", {
      name: user.name,
      token: resetToken
    }, emailHandler.REQUEST_RESET_PASSWORD);
  }

  /**
   * @param userId: String
   * @param token: String
   * @param form: {password: String}
   * @returns {Promise<void>}
   */
  verifyPassReset = async(userId, form) => {
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
   * @param user: UserModel
   * @returns token: String
   */
  getToken = (user) => jwt.sign({
    _id: user._id,
    email: user.email,
    // password: user.password,
    isAdmin: user.isAdmin,
    iat: new Date().getTime(),
    // exp: new Date().setDate(new Date().getDate() + 7),
  }, secret_key, {expiresIn: '7d'});

}

module.exports = new AuthService();
