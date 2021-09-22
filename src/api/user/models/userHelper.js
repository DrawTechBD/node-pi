exports.authMiddleware = require('passport').authenticate('jwt', {session: false});
