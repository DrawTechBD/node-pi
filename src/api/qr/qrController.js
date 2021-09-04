const QRCode = require("qrcode");
const fs = require("fs");
const enigma = require("../../helper/enigma");

const QRModel = require('./qrModel');
const UserModel = require('../user/userModel');

const utils = require('../../helper/utils');
const QRService = require('./qrService');
const catchAsync = require("../error/catchAsync");

class QRController {
  showAll = catchAsync(async (req, res, next) => {
    const data = await QRService.showAll();
    res.json(data);
  });

  generate = async (req, res) => {
    try {
      const data = await QRService.generate(req.body, req.user._id);
      return res.json(data);
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  scan = async (req, res) => {
    try {
      const data = await QRService.scan(req.body.data);
      return res.json(data);
    } catch (e) {
      return res.status(500).json({
        msg: "Error decrypting user",
        error: e,
      });
    }
  }
}
module.exports = new QRController();
