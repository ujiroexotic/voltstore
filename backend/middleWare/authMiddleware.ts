//This file contains middleware that protect routes by ensuring only authenticated or authorized users can accesss them.
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import asyncHandler from "express-async-handler";

//The AuthRequest allow request to attaching a user property to the request object.
export interface AuthRequest extends Request {
  user?: any;
}

export const protect = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  //The middleware looks for the Token in the Authorization header.
  if (req.headers.authorization && req.headers.authorization.startsWith('bearer')) {
    try {
      //The token is verified using jwt.verify
      token = req.headers.authorization.split(' ')[1];
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

      req.user = await User.findById(decoded.id).select('-password');
      next();
    
    } catch (error) {
      res.status(401);
      console.error({ message: 'Not authorized, token failed'});
    }
  }
  if (!token) {
    res.status(401);
    console.error({message: 'Not authorized, no token'});
  }
});