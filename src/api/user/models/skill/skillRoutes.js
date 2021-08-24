const express = require('express');
const router = express.Router();
const skillController = require('./skillController.js');
const authMiddleware = require('passport').authenticate('jwt', {session: false});


router.get('/', skillController.list);

router.get('/:_id', skillController.showByUser);

router.post('/', authMiddleware, skillController.create);

router.put('/:_id', authMiddleware, skillController.update);

router.delete('/:_id', authMiddleware, skillController.remove);

module.exports = router;


