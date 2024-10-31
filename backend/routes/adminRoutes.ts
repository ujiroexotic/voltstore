import express from 'express';
import {
  getCartItems,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from '../controllers/cartController';
import { authenticateUser } from '../middlewares/auth';

const router = express.Router();

// Get cart items (protected)
router.get('/login', authenticateUser, getCartItems);

export default router;
