// Import necessary modules
import { Request, Response } from "express";
import Product from "../models/Product"; // Adjust the import according to your file structure


// Define CreateProductRequest without express-fileupload
export interface CreateProductRequest extends Request {
  body: {
    name: string;
    description: string;
    price: string;
    category: string;
    stock: string;
  };
  files: Express.Multer.File[]; // Use multer's File array for files
}

// Controller to create a product
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  // Assert req as CreateProductRequest
  const { name, description, price, category, stock } = (req as CreateProductRequest).body;
  const files = (req as CreateProductRequest).files;

  // Ensure images are saved as Buffers from multer
  const imageBuffers = files ? files.map(file => file.buffer) : [];

  // Create the new product
  const newProduct = new Product({
    name,
    description,
    price: parseFloat(price),
    category: category.trim(),
    stock: parseInt(stock, 10),
    imageUrls: imageBuffers,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json({ message: "Product created successfully", product: savedProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


// Get all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get a product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update a product by ID (Admin only)
export const updateProduct = async (req: Request, res: Response) => {
  const { name, description, price, category, imageUrl } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category, imageUrl },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: "Failed to update product", error });
  }
};

// Delete a product by ID (Admin only)
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(204).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete all products (Admin only)
export const deleteAllProducts = async (req: Request, res: Response) => {
  try {
    await Product.deleteMany();

    res.status(200).json({ message: "All products have been deleted." });
  } catch (error) {
    console.error("Error deleting all products:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};
