import express from 'express';
import {
  placeOrder,
  getAllOrders,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder
} from '../controllers/orderController';
import { protect, admin } from '../middlewares/authMiddleware';

const router = express.Router();

// Route to place a new order
router.post('/', placeOrder);

// Route to get all orders (admin only)
router.get('/', protect, admin, getAllOrders);

// Route to get orders for the logged-in user
router.get('/my', protect, getUserOrders);

// Route to get a specific order by ID
router.get('/:id', protect, getOrderById);

// Route to update order status (admin only)
router.put('/:id', protect, admin, updateOrderStatus);

// Route to cancel an order
router.delete('/:id', protect, admin, cancelOrder);

export default router;
