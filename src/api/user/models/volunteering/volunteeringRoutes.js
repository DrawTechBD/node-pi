const express = require('express');
const router = express.Router();
const volunteeringController = require('./volunteeringController.js');
const userHelper = require('../userHelper');


router.get('/', volunteeringController.list);

router.get('/:_id', volunteeringController.showByUser);

router.post('/', userHelper.authMiddleware, volunteeringController.create);

router.put('/:_id', userHelper.authMiddleware, volunteeringController.update);

router.delete('/:_id', userHelper.authMiddleware, volunteeringController.remove);

module.exports = router;


