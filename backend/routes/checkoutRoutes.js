const express = require('express');
const router = express.Router();
const { createOrder } = require('../controllers/checkoutController');

router.post('/checkout', createOrder);

module.exports = router;
