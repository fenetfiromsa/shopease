const express = require('express');
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getMyOrders,
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/auth');


router.post('/', protect, createOrder);


router.get('/myorders', protect, getMyOrders);


router.get('/', protect, admin, getAllOrders);

module.exports = router;
