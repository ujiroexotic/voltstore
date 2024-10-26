//This file handles user registration and login.
import { Request, Response } from 'express';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';


// Utility function for token generation
const Token = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: '30d' });
  //console.log('JWT_SECRET:', process.env.JWT_SECRET);
};
console.log("start");
// Register a new user
export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  
  // Check if the user already exists
  const Exists = await User.findOne({ email });
  if (Exists) {
    res.status(400);
    console.error({message: 'Email already exists'});
  }

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create and save the user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    // Respond with user data and token
    res.status(201).json({
      message: 'User registeration successful!',
      _id: user._id,
      name: user.name,
      email: user.email,
      token: Token(user._id),
    });
  } else {
    res.status(400);
    console.error({message: 'User registertion failed'});
  }
});

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
    console.error({message: 'Invalid email or password'});
  }
});