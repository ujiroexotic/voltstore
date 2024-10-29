import express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string; // or whatever type you have for user ID
        role: 'customer' | 'admin'; // Adjust this type according to your roles
      };
    }
  }
}
