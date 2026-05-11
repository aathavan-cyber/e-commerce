const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/', orderController.createOrder); // For placing orders
router.get('/', orderController.getAdminOrders); // For the admin dashboard

module.exports = router;