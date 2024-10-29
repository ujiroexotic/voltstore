import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';

const router = express.Router();

// Get all products
router.get('/', getAllProducts);

// Get a single product by ID
router.get('/:id', getProductById);

// Create a new product (Admin only)
router.post('/', createProduct);

// Update a product by ID (Admin only)
router.put('/:id', updateProduct);

// Delete a product by ID (Admin only)
router.delete('/:id', deleteProduct);

export default router;
