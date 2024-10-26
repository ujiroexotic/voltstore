//UserRoutes handle the registering, login requests.
//Getting user profile data.
import { registerUser, authUser } from '../controllers/userController';
import { protect } from '../middleWare/authMiddleware';
import express from 'express';

const router = express.Router();
//Route for user registration
router.post('/register', registerUser);
//Route for user login
router.post('/login', authUser);

router.get('/profile', protect, (req, res) => {
  res.json(req.user);
}) ;

export default router;