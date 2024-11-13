import express from 'express';
import {
  placeOrder,
  getAllOrders,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  getAllOrdersThisWeekByDay
} from '../controllers/orderController';
import { protect, admin } from '../middlewares/authMiddleware';

const router = express.Router();

// Route to place a new order
router.post('/', protect, placeOrder);

// Route to get All order of this week with interval of 7 days (admin only)
router.get('/thisWeek', protect, admin, getAllOrdersThisWeekByDay);

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
