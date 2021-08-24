const express = require('express');
const router = express.Router();
const factController = require('./factController.js');
const userHelper = require('../userHelper');


router.get('/', factController.list);

router.get('/:id', factController.showByUser);

router.post('/', userHelper.authMiddleware, factController.create);

router.put('/:id', userHelper.authMiddleware, factController.update);

router.delete('/:id', userHelper.authMiddleware, factController.remove);

module.exports = router;


