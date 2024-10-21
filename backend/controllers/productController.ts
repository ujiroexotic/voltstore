import { Request, Response } from 'express';
import Product from '../models/Products';

// Get all products
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new product
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  const { name, price, description, category, countInStock } = req.body;
  try {
    const product = new Product({ name, price, description, category, countInStock });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
