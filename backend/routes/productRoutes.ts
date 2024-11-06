import express from "express";
import {
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  CreateProductRequest,
  deleteAllProducts,
  createProduct,
} from "../controllers/productController";
import path from "path";
import fs from "fs";
import multer from "multer";
import {
  deleteAllProductImages,
  deleteProductImages,
} from "../middlewares/file";
import { admin, protect } from "../middlewares/authMiddleware";

const router = express.Router();

// Configure multer to store images in memory as Buffers
const uploadProductImages = multer({ storage: multer.memoryStorage() });

router.get("/", getAllProducts);

// Get a single product by ID
router.get("/:id", getProductById);

// Route to create a new product
router.post(
  "/",
  uploadProductImages.array("imageUrls", 5), // Limit the number of images to 5
  createProduct
);

// Update a product by ID
router.put("/:id", updateProduct);

// Route to delete a single product
router.delete("/:id", deleteProductImages, deleteProduct);

// Route to delete all products
router.delete("/", deleteAllProductImages, deleteAllProducts);

export default router;
