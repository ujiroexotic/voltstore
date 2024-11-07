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
router.get('/', protect, getCartItems);

// Add item to cart (protected)
router.post('/', addToCart);

// Update item quantity in cart (protected)
router.put('/:id', protect, updateCartItem);

// Remove item from cart (protected)
router.delete('/:id', protect, removeFromCart);

//Clear the entire cart
router.delete('/', protect, clearCart);

export default router;
