const express = require('express');
const router = express.Router();
const passport = require('passport');
const qrController = require('./qrController');

router.get('/', passport.authenticate('jwt', {session: false}), qrController.showAll);

// Generate
router.post('/generate', passport.authenticate('jwt', {session: false}), qrController.generate);

// Scan QR Code output
router.post('/scan', qrController.scan);


module.exports=router;
