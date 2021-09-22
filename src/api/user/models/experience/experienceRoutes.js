const express = require('express');
const router = express.Router();
const experienceController = require('./experienceController.js');
const userHelper = require('../userHelper');

router.get('/', experienceController.list);

router.get('/:id', experienceController.showByUser);

router.post('/', userHelper.authMiddleware, experienceController.create);

router.put('/:id', userHelper.authMiddleware, experienceController.update);

router.delete('/:id', userHelper.authMiddleware, experienceController.remove);

module.exports = router;


