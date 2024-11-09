//This file handles user registration and login.
import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

// Utility function for token generation
const Token = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: "30d" });
  //console.log('JWT_SECRET:', process.env.JWT_SECRET);
};

// Authenticate a user and return a token
export const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    // Passwords match, return user data and token
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: Token(user._id.toString()),
    });
  } else {
    // Invalid credentials
    res.status(401);
    console.error({ message: "Invalid email or password" });
  }
});

// Register a new user
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      role,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log("user created successfully");
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Login a user
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      {
        expiresIn: "30d",
      }
    );
    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, 
      sameSite: "none",
      secure: true, // Ensure the cookie is only sent over HTTPS
    });

    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// logout user
export const logoutUser = async (req: Request, res: Response) => {
  try {
    res.clearCookie("authToken"); // Clear the JWT cookie
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get user profile
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update user profile
export const updateUserProfile = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user?._id,
      { name, email },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: "Failed to update user", error });
  }
};

// Delete a user by admin
export const deleteUser = async (req: Request, res: Response) => {
  const userIdToDelete = req.params.userId;

  try {
    // Check if the requesting user is an admin
    if (req.user?.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    // Find the user by ID and delete
    const user = await User.findByIdAndDelete(userIdToDelete);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
