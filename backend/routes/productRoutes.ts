import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  CreateProductRequest,
} from "../controllers/productController";
import path from "path";
import fs from "fs";
import multer from "multer";

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
router.post("/", uploadProduct.array("images", 5), (req, res) => {
  console.log(req.body);  // Log the form fields
  console.log(req.files);  // Log the uploaded files
  createProduct(req as CreateProductRequest, res);
});

// Update a product by ID
router.put("/:id", updateProduct);

// Delete a product by ID
router.delete("/:id", deleteProduct);

export default router;
