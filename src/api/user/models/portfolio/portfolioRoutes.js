const express = require('express');
const router = express.Router();
const portfolioController = require('./portfolioController.js');
const authMiddleware = require('passport').authenticate('jwt', {session: false});


router.get('/', portfolioController.list);

router.get('/:_id', portfolioController.showByUser);

router.post('/', authMiddleware, portfolioController.create);

router.put('/:_id', authMiddleware, portfolioController.update);

router.delete('/:_id', authMiddleware, portfolioController.remove);

module.exports = router;


