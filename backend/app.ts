import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import morgan from 'morgan'; // Optional for request logging
import connectDB from './config/db'; // Database connection
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import cartRoutes from './routes/cartRoutes';
import orderRoutes from './routes/orderRoutes';
import { authenticateUser } from './middlewares/auth';
import { errorHandler, notFound } from './middlewares/errorMiddleware';
import { authorizeAdmin } from './middlewares/authorize';
import { requestLogger } from './middlewares/logger';

dotenv.config();
const app: Application = express();

// Connect to MongoDB
connectDB();

// Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // Log requests in development mode
}
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests
app.use(requestLogger); // Log all requests

// Serve static files (optional)
app.use(express.static(path.join(__dirname, 'public')));

// Handle root request
app.get('/', (req: Request, res: Response) => {
  return res.send('Welcome to the E-commerce API');
});

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', authenticateUser, cartRoutes); // Auth required for cart
app.use('/api/orders', authenticateUser, orderRoutes); // Auth required for orders

// Admin-only route (example)
app.use('/api/admin', authenticateUser, authorizeAdmin, (req: Request, res: Response) => {
  res.send('Welcome Admin');
});

// Error handling middleware
app.use(notFound); // 404 handling
app.use(errorHandler); // General error handler

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

