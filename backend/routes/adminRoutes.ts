import express from 'express';
import {
  getCartItems,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from '../controllers/cartController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

// Get cart items (protected)
router.get('/login', protect, getCartItems);

export default router;
