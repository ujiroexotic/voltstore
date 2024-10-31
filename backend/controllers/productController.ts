import { Request, Response } from 'express';
import { UploadedFile, FileArray } from 'express-fileupload'; // Import the necessary types from express-fileupload
import Product from '../models/Product'; // Adjust the import according to your file structure

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

export const createProduct = async (req: CreateProductRequest, res: Response) => {
  try {
    const { name, description, price, category, stock } = req.body;

    // Collect the file paths of the uploaded images
    const imagePaths: string[] = [];

    // Check if req.files is an array or an object
    if (Array.isArray(req.files)) {
      // If it's an array, map through and get the name for each file
      req.files.forEach((file) => {
        imagePaths.push(`/uploads/products/${file.name}`);
      });
    } else if (typeof req.files === 'object' && req.files !== null) {
      // If it's a single file, handle it as an object
      const fileArray = Object.values(req.files); // Get an array of files
      fileArray.forEach((file) => {
        imagePaths.push(`/uploads/products/${file.name}`);
      });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      images: imagePaths, // assuming `images` is an array in your Product schema
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};



// Get all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({});
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
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
