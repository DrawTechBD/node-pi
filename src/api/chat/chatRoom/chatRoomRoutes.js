const passport = require('passport');
const express = require('express');
const router = express.Router();

const chatroomController = require('./chatRoomController.js');


/*
 * GET
 */
router.get('/', chatroomController.list);

/*
 * GET
 */
router.get('/user', passport.authenticate('jwt', {session: false}), chatroomController.listByUser);

/*
 * GET
 */
router.get('/:id', chatroomController.show);

/*
 * POST
 */
router.post('/',  passport.authenticate("jwt", {session: false}), chatroomController.create);

// Chat request
router.post('/request/:chat',  passport.authenticate("jwt", {session: false}), chatroomController.request);

// Chat request response
router.post('/response', passport.authenticate('jwt', {session: false}), chatroomController.response);

/*
 * PUT
 */
router.put('/:id', chatroomController.update);

/*
 * DELETE
 */
router.delete('/:id', chatroomController.remove);

module.exports = router;
