const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require('moment');
const dotenv = require('dotenv');
const ObjectId = require('mongoose').Types.ObjectId
const QRCode = require('qrcode');
const mergeImages = require('merge-base64');
const fs = require('fs');

const utils = require('../../helper/utils');
const authConfig = require('../../config/auth.config');
const enigma = require('../../helper/enigma');
const UserModel = require('./userModel');
const UserService = require('./userService');
const UserValidator = require('./userValidator');
const TokenModel = require('../token/tokenModel');
const emailHandler = require('../../views/emails/emailHandler');

dotenv.config();

const secret_key = process.env.JWT_TOKEN;
// const expiresIn = process.env.JWT_EXPIRES_IN;
const bcryptSalt = parseInt(process.env.BCRYPT_SALT);
const clientUrl = process.env.CLIENT_URL;

async function getToken(user) {
  return jwt.sign({
    _id: user._id,
    email: user.email,
    // password: user.password,
    isAdmin: user.isAdmin,
    iat: new Date().getTime(),
    // exp: new Date().setDate(new Date().getDate() + 7),
  }, secret_key, {expiresIn: '7d'});
}

module.exports = {
  // Social Auth
  social: async (req, res) => {
   try{
     const {idToken} = req.body;
     const decodedToken = await authConfig.admin.auth().verifyIdToken(idToken);
     // console.log(JSON.stringify(decodedToken));
     let user = await UserModel.findOne().or([{name: decodedToken.name}, {email: decodedToken.email}, {phone: decodedToken.phone_number}]);
     console.log(`User ${user}`);
     if(user == null){
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
     user.token = await getToken(user);
     user.expiresIn = moment().add(7, 'days').toString();
     await user.save();

     return res.json(user);
   } catch(e) {
     return res.status(401).json("Unauthenticated");
   }
  },

  // Register user
  register: async function (req, res) {
    const user = req.body;
    let {errors, isValid} = await UserValidator.validateRegisterInput(user);
    if (!isValid) return res.status(400).json(errors);

    const avatar = gravatar.url(user.email, {
      s: "200",
      r: "pg",
      d: "mm",
    });
    // const hashedPassword = await bcrypt.hash(user.password, bcryptSalt);
    const newUser = new UserModel({
      name: user.name,
      email: user.email,
      password: user.password,
      avatar: avatar,
      expiresIn: moment().add(7, 'days').toString()
    });
    newUser.token = await getToken(newUser);
    await newUser.save();
    return res.json(newUser);

  },

  // Login user
  login: async function (req, res) {
    try {
      const user = req.body;

      // Validate input
      const {errors, isValid} = await UserValidator.validateLoginInput(user);
      if (!isValid) throw errors;

      // Get user from database
      const data = await UserService.showWithPassword(user.email);
      // throw if unknown user
      if (!data) throw {email: "Email does not exist!"};

      // Check for password match
      const doMatch = await bcrypt.compare(user.password, data.password);
      if (!doMatch) throw {password: "Invalid password!"};

      // token
      data.token = await getToken(data);
      data.expiresIn = moment().add(7, 'days').toString();
      data.save();
      delete data._doc.password;
      return res.json(data);
    } catch (e) {
      console.log("Error", e);
      return res.status(401).json(e);
    }
  },

  // Verify token
  authenticate: async function (req, res) {
    try {
      const user = await UserModel.findOne({_id: req.user._id});
      user.expiresIn = moment().add(7, 'days').toString();
      return res.json(await UserService.show(req.user._id));
    } catch (e) {
      return res.status(400).json(e);
    }
  },

  // Request for a password reset
  requestPassReset: async function (req, res) {
    try {
      if (req.body.email === null || req.body.email === "") throw{email: "Enter your email first!"};
      const user = await UserModel.findOne({email: req.body.email});
      if (!user) throw {email: "Email does not exist!"};

      let token = await TokenModel.findOne({userId: user._id});
      if (token) await token.deleteOne();

      let resetToken = crypto.randomBytes(32).toString('hex');
      const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));

      await new TokenModel({
        userId: user._id,
        token: hash,
        createdAt: Date.now(),
      }).save();

      const link = `${clientUrl}/auth/reset-password?token=${resetToken}&userId=${user._id}`;
      await emailHandler.sendEmail(user.email, "Password Reset Request", {
        name: user.name,
        link: link
      }, emailHandler.REQUEST_RESET_PASSWORD);
      return res.json(link);
    } catch (e) {
      console.log(e);
      return res.status(400).json(e);
    }
  },

  // Reset password
  resetPassword: async function (req, res) {
    try {
      const {userId, token} = req.query;
      const {password} = req.body;

      const passwordResetToken = await TokenModel.findOne({userId});
      if (!passwordResetToken) throw {token: "Invalid or expired password reset token"};

      const isValid = await bcrypt.compare(token, passwordResetToken.token);
      if (!isValid) throw {token: "Invalid or expired password reset token"};


      const hash = await bcrypt.hash(password, Number(bcryptSalt));

      await UserModel.updateOne({_id: userId}, {$set: {password: hash}}, {new: true});

      const user = await UserModel.findById({_id: userId});
      await emailHandler.sendEmail(user.email, "Password reset successful", {name: user.name}, emailHandler.RESET_PASSWORD);

      await passwordResetToken.deleteOne();
      return res.json(req.body);
    } catch (e) {
      console.log(e);
      return res.status(400).json(e);
    }
  },
}
