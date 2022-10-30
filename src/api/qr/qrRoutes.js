const express = require('express');
const router = express.Router();
const qrController = require('./qrController');
const {authenticate} = require("../../helper/utils");

router.get('/', authenticate, qrController.showAll);

// Generate
router.post('/generate', authenticate, qrController.generate);

// Scan QR Code output
router.post('/scan', qrController.scan);


module.exports=router;
