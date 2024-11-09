import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  logoutUser,
} from "../controllers/userController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

// Register a new user
router.post("/register", registerUser);

// Login a user
router.post("/login", loginUser);

// Logout a user
router.post("/logout", logoutUser);

// check if user is admin
router.get("/checkAdmin", protect, (req, res) => {
  console.log("user:");
  console.log(req.user);
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  res.status(201).send("Welcome Admin");
});

// hell to user
router.get("/hello", (req, res) => {
  res.status(201).send("Hello User");
});

// Get user profile (protected)
router.get("/profile", protect, getUserProfile);

// Update user profile (protected)
router.put("/profile", protect, updateUserProfile);

// Route to delete a user (admin only)
router.delete("/:userId", protect, deleteUser); // Add route to delete user
export default router;
