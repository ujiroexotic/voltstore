import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import productRoutes from './routes/productRoutes';
import { errorHandler, notFound } from './middleWare/errorMiddleware';
import userRoutes from './routes/userRoutes';
import path from 'path';

dotenv.config();
const app: Application = express();

// Connect to database
connectDB();

// Middleware
app.use(express.urlencoded({extended: true}));
//app.use(express.static(path.join(__dirname, 'public')));
//handle requests
app.get('/', (req: Request, res: Response) => {
  return res.send('hello world');
});
// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
