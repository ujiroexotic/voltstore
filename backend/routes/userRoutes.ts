import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
} from '../controllers/userController';
import { authenticateUser } from '../middlewares/auth';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Login a user
router.post('/login', loginUser);

// Get user profile (protected)
router.get('/profile', authenticateUser, getUserProfile);

// Update user profile (protected)
router.put('/profile', authenticateUser, updateUserProfile);

// Route to delete a user (admin only)
router.delete('/:userId', protect, deleteUser); // Add route to delete user
export default router;
