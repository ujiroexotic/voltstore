import { Request, Response, NextFunction } from "express";
import Product from "../models/Product";
import path from "path";
import fs from "fs/promises"; // Only import fs/promises once
import Category from "../models/category";

export const deleteProductImages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    console.log("product", product);
    console.log('product.imageUrls', product.imageUrls);

    // Define the path to the product category folder
    const categoryPath = path.join(
      __dirname,
      "..",
      "uploads",
      "products",
    );

    // Delete each image associated with this product
    await Promise.all(
      product.imageUrls.map(async (imageUrl) => {
        const fileName = path.basename(imageUrl);
        const imagePath = path.join(categoryPath, fileName); // Normalization is not needed here

        console.log('Attempting to delete:', imagePath); // Log the full path

        try {
          await fs.unlink(imagePath);
        } catch (err) {
          console.error(`Error deleting file: ${imagePath}`, err);
        }
      })
    );

    console.log(`Deleted images for product ${productId}`);
    next();
  } catch (error) {
    console.error("Error in deleteProductImages middleware:", error);
    res.status(500).json({ message: "An error occurred while deleting images" });
  }
};

export const deleteAllProductImages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productsPath = path.join(__dirname, "..", "uploads", "products");

    // Check if the products directory exists before attempting to delete
    await fs.access(productsPath)
      .then(() => {
        // If the directory exists, proceed to delete its contents
        return fs.rm(productsPath, { recursive: true, force: true });
      })
      .catch((err) => {
        // If the directory does not exist, log a warning and send a response
        console.warn("Products directory does not exist:", productsPath);
        return Promise.reject(new Error("No product images to delete."));
      });

    console.log("Deleted all product images and folders in products directory");

    // Optionally recreate the products directory if you want it to exist afterwards
    await fs.mkdir(productsPath, { recursive: true });

    next();
  } catch (error) {
    console.error("Error in deleteAllProductImages middleware:", error);
    res.status(500).json({ message: error || "An error occurred while deleting all images" });
  }
};

export const deleteCategoryImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const imagePath = path.join(__dirname, "..", "uploads", "categories", category.imageUrl);

    await fs.unlink(imagePath);

    console.log(`Deleted image for category ${req.params.id}`);
    next();
  } catch (error) {
    console.error("Error in deleteCategoryImage middleware:", error);
    res.status(500).json({ message: "An error occurred while deleting the image" });
  }
};
