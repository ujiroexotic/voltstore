import { Request, Response } from "express";
import Category from "../models/category";
import fs from "fs/promises";

// Get all categories
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

// Create a new category
export const createCategory = async (req: Request, res: Response) => {
  const { name, description } = req.body;

  // Check for missing fields
  if (!name || !description) {
    return res
      .status(400)
      .json({ message: "Name and description are required" });
  }
  console.log("file");
  console.log(req.file);
  // Ensure an image file is uploaded
  if (!req.file) {
    console.log("no file sent");
    return res.status(400).json({ message: "Image file is required" });
  }

  // Set up the image data as Buffer
  const imageUrl = {
    data: req.file.buffer, // Buffer from multer's memory storage
    contentType: req.file.mimetype,
  };

  // Create the new category with image data as Buffer
  const newCategory = new Category({
    name,
    description,
    imageUrl,
  });

  try {
    await newCategory.save();
    res.status(201).json({
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ message: "Error creating category", error });
  }
};

// Get a single category by ID
export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching category", error });
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
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error });
  }
};

// Delete a category by ID
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (category) {
      res.status(200).json({ message: "Category deleted successfully" });
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
  }
};
