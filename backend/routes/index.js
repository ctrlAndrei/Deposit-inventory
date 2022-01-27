const express = require('express');

const CONTROLLER = require('../controller/index')

const router = express.Router();


router.get('/healthcheck', (req, res) => {
	res.status(200).json({
		message: "Server is alive"
	})
})

router.post('/add', CONTROLLER.addItem);
router.get('/getItem/:name',CONTROLLER.getItem);
router.get('/get', CONTROLLER.get_items);
router.delete('/:id', CONTROLLER.deleteItem);
router.put('/update', CONTROLLER.updateItem);

router.post('/products/add', CONTROLLER.addProduct);
router.get('/products/get/:code', CONTROLLER.getProduct);

module.exports = router;