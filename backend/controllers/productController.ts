import { Request, Response } from "express";
import { UploadedFile, FileArray } from "express-fileupload"; // Import the necessary types from express-fileupload
import Product from "../models/Product"; // Adjust the import according to your file structure

// Extend the Request interface to include the body and files
export interface CreateProductRequest extends Request {
  body: {
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
  };
  files: FileArray; // Use FileArray type for files
}
// Import your Product model if using a database

interface Product {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrls: string[];
}

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, description, price, category, stock } = req.body;

  console.log("file");
  console.log(req.files);

  // Map the uploaded files to an array of image URLs
  const imagePaths = Array.isArray(req.files)
    ? req.files.map((file: Express.Multer.File) => file.path)
    : [];

  console.log("imagePaths");
  console.log(imagePaths);

  // Create the new product with the correct field name for image URLs
  const newProduct: Product = {
    name,
    description,
    price: parseFloat(price),
    category: category.trim(), // Trim any whitespace
    stock: parseInt(stock),
    imageUrls: imagePaths, // Use the correct field name
    // createdAt: new Date(),
    // updatedAt: new Date(),
  };

  try {
    // Save the product in the database
    const savedProduct = await Product.create(newProduct);
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
