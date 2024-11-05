import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  CreateProductRequest,
  deleteAllProducts,
} from "../controllers/productController";
import path from "path";
import fs from "fs";
import multer from "multer";
import { uploadProductImages } from "../services/upload";
import {
  deleteAllProductImages,
  deleteProductImages,
} from "../middlewares/file";
import { admin, protect } from "../middlewares/authMiddleware";

const router = express.Router();

// Setup Multer for multiple image uploads
const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "..", "uploads", "products");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 7)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const uploadProduct = multer({
  storage: productStorage,
});

// Get all products
router.get("/", getAllProducts);

// Get a single product by ID
router.get("/:id", getProductById);

// Route to create a new product
router.post("/", createProduct);

// Update a product by ID
router.put("/:id", updateProduct);

// Route to delete a single product
router.delete("/:id", deleteProduct);

// Route to delete all products
router.delete("/", deleteAllProducts);

export default router;
