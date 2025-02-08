const express = require('express');
const router = express.Router();
const { validateItem } = require('../middleware/validation');
const itemsController = require('../controllers/items');

router.get('/', itemsController.getAllItems);
router.get('/:id', itemsController.getItemById);
router.post('/', validateItem, itemsController.createItem);
router.put('/:id', validateItem, itemsController.updateItem);
router.delete('/:id', itemsController.deleteItem);

module.exports = router;