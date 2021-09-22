const passport = require('passport');

class Middleware {
    static authMiddleware = () => passport.authenticate('jwt', {session: false});
}

module.exports = Middleware;