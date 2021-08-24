const passport = require('passport');
const express = require('express');
const router = express.Router();
const chatController = require('./chatController.js');

/*
 * GET
 */
router.get('/', chatController.list);

/**
 * GET by ROOM
 */
router.get('/room/:room', chatController.listByRoom);

/*
 * GET
 */
router.get('/:id', chatController.show);

/*
 * POST
 */
router.post('/', passport.authenticate("jwt", {session: false}), chatController.create);

/*
 * PUT
 */
router.put('/:id', chatController.update);

/*
 * DELETE
 */
router.delete('/', chatController.removeAll);
router.delete('/:id', chatController.remove);

module.exports = router;
