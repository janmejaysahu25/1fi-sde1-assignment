const express = require('express');
const router = express.Router();
const { createOrder } = require('../controllers/checkoutController');

router.post('/', createOrder);

module.exports = router;
