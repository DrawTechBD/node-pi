// const jwt = require('jsonwebtoken');
// const passport = require('passport');
// const passportJWT = require('passport-jwt');
// const UserModel = require('../api/user/userModel');
// const FirebaseAdmin = require('firebase-admin');
// const serviceAccount = require('./serviceAccountKey.json');
//
//
//   require('dotenv').config();
// class AuthConfig {
//     constructor() {
//         this.secret_key = process.env.JWT_TOKEN;
//     }
//
//     config() {
//         // Firebase admin initialize
//         this.admin = FirebaseAdmin.initializeApp({
//             credential: FirebaseAdmin.credential.cert(serviceAccount),
//         });
//
//         // Initialize passport
//         passport.use(new passportJWT.Strategy(
//             {
//                 jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
//                 secretOrKey: this.secret_key
//             }, (jwt_payload, done) => {
//                 UserModel.findById(jwt_payload._id)
//                     .then((user) => {
//                         if (user) return done(null, user);
//                         return done(null, false);
//                     })
//                     .catch((error) => {
//                         throw error;
//                     })
//             }
//         ));
//
//         passport.serializeUser((req, user, done) => {
//             done(undefined, user);
//         });
//
//         passport.deserializeUser((_id, done) => {
//             UserModel.findById(_id, (err, user) => done(err, user));
//         });
//         console.log("Passport initialized!");
//     }
//
//     async get_token(user) {
//         return jwt.sign({
//             email: user.email,
//             password: user.password,
//             name: user.name,
//             isAdmin: user.isAdmin,
//             avatar: user.avatar,
//             _id: user._id,
//             iat: new Date().getTime(),
//             exp: new Date().setDate(new Date().getDate() + 7)
//         }, this.secret_key);
//     }
// }
//
// module.exports=new AuthConfig();
