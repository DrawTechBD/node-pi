const express = require('express');
const router = express.Router();
const rotaController = require('./rotaController.js');

/*
 * GET
 */
router.get('/', rotaController.list);

/*
 * GET
 */
router.get('/:id', rotaController.show);

/*
 * POST
 */
router.post('/', rotaController.create);

/*
 * PUT
 */
router.put('/:id', rotaController.update);

/*
 * DELETE
 */
router.delete('/:id', rotaController.remove);

module.exports = router;
