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
router.get('/', authenticateUser, getCartItems);

// Add item to cart (protected)
router.post('/', authenticateUser, addToCart);

// Update item quantity in cart (protected)
router.put('/:id', authenticateUser, updateCartItem);

// Remove item from cart (protected)
router.delete('/:id', authenticateUser, removeFromCart);

//Clear the entire cart
router.delete('/', authenticateUser, clearCart);

export default router;
