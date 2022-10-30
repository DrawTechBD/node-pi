const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('./userController.js');

router.get('/username/:username', userController.showByUsername);

/*
 * GET
 */
router.get('/:id', userController.showById);
router.get("/", userController.showAll);

/*
 * POST
 */
router.post('/', userController.create);

router.post('/active/:id', userController.active);

router.put('/info', passport.authenticate('jwt', {session: false}), userController.updateInfo);

/*
 * PUT
 */
router.put('/:id', passport.authenticate("jwt", {session: false}), userController.update);


/*
 * DELETE
 */
router.delete('/:id', userController.remove);

module.exports = router;
