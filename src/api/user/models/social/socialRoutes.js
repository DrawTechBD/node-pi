const express = require('express');
const router = express.Router();
const socialController = require('./socialController.js');
const authMiddleware = require('passport').authenticate('jwt', {session: false});


router.get('/', socialController.list);

router.get('/:_id', socialController.showByUser);

router.post('/', authMiddleware, socialController.create);

router.put('/:_id', authMiddleware, socialController.update);

router.delete('/:_id', authMiddleware, socialController.remove);

module.exports = router;


