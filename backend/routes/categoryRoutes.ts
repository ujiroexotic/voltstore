import express from 'express';
import {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController';
import { uploadCategoryImages } from '../services/upload';

const router = express.Router();

// Route to get all categories
router.get('/', getAllCategories);

// Route to create a new category
router.post('/', uploadCategoryImages.single("imageUrl"), createCategory);

// Route to get a single category by ID
router.get('/:id', getCategoryById);

// Route to update a category by ID
router.put('/:id', updateCategory);

// Route to delete a category by ID
router.delete('/:id', deleteCategory);

export default router;
