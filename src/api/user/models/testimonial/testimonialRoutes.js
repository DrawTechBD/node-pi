const express = require('express');
const router = express.Router();
const testimonialController = require('./testimonialController.js');
const authMiddleware = require('passport').authenticate('jwt', {session: false});


router.get('/', testimonialController.list);

router.get('/:_id', testimonialController.showByUser);

router.post('/', authMiddleware, testimonialController.create);

router.put('/:_id', authMiddleware, testimonialController.update);

router.delete('/:_id', authMiddleware, testimonialController.remove);

module.exports = router;


