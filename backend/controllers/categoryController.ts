import { Request, Response } from 'express';
import Category from '../models/category';

// Get all categories
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });
  }
};

// Create a new category
export const createCategory = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  console.log('req.body', req.body)
  try {
    const category = new Category({ name, description });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error creating category', error });
  }
};

// Get a single category by ID
export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching category', error });
  }
};

// Update a category by ID
export const updateCategory = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error });
  }
};

// Delete a category by ID
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (category) {
      res.status(200).json({ message: 'Category deleted successfully' });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error });
  }
};
