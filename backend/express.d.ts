import express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: ObjectId | string;
        name: string;
        email: string;
        role: "customer" | "admin";
        updatedAt: Date;
        __v: number;
      };
    }
  }
}
