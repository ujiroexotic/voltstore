import express from "express";
import multer from "multer";
import {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController";
// import { uploadCategoryImages } from '../services/upload';

const router = express.Router();

// Route to get all categories
router.get("/", getAllCategories);

// Configure multer to use memory storage
const uploadCategoryImages = multer({ storage: multer.memoryStorage() });

// Route to create a new category
router.post(
  "/",
  (req, res, next) => {
    console.log("file");
    console.log(req.file);
    next();
  },
  uploadCategoryImages.single("imageUrl"),
  createCategory
);

// Route to get a single category by ID
router.get("/:id", getCategoryById);

// Route to update a category by ID
router.put("/:id", updateCategory);

// Route to delete a category by ID
router.delete("/:id", deleteCategory);

export default router;
