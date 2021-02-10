const express = require("express");
const router = express.Router();
const passport = require("passport");
const iotController = require("../controller/iot.controller");
/*
  @route  GET /api/iot/
  @desc   Test
 */
router.get("/", iotController.getIot);

module.exports = router;
