const express = require('express');
const router = express.Router();
const educationController = require('./educationController.js');

const authMiddleware = require('passport').authenticate('jwt', {session: false});


router.get('/', educationController.list);

router.get('/:_id', educationController.showByUser);

router.post('/', authMiddleware, educationController.create);

router.put('/:_id', authMiddleware, educationController.update);

router.delete('/:_id', authMiddleware, educationController.remove);

module.exports = router;

