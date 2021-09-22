const express = require('express');
const router = express.Router();
const itemController = require('./itemController.js');
const authMiddleware = require('passport').authenticate('jwt', {session: false});


router.get('/', itemController.list);

router.get('/:_id', itemController.showByUser);

router.post('/', authMiddleware, itemController.create);

router.put('/:_id', authMiddleware, itemController.update);

router.delete('/:_id', authMiddleware, itemController.remove);

module.exports = router;


