//This file contains middleware that protect routes by ensuring only authenticated or authorized users can accesss them.
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import asyncHandler from "express-async-handler";

//The AuthRequest allow request to attaching a user property to the request object.
export interface AuthRequest extends Request {
  user?: any;
}

export const protect = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;

    if (req.cookies) {
      if (req.cookies.authToken) {
        token = req.cookies.authToken;
        try {
          const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
          req.user = await User.findById(decoded.id).select("-password");
          next();
        } catch (error) {
          res.status(401).json({ message: "Not authorized, token failed" });
        }
      } else if (req.cookies.userAuth) {
        token = req.cookies.userAuth;
        try {
          const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
          req.user = await User.findById(decoded.id).select("-password");
          next();
        } catch (error) {
          res.status(401).json({ message: "Not authorized, token failed" });
        }
      } else {
        res.status(401).json({ message: "Not authorized, no token" });
      }
    } else {
      res.status(401).json({ message: "Not authorized, no token" });
    }
  }
);

export const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
};
