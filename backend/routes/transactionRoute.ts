import express from "express";
import {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransactionStatus,
  deleteTransaction,
  getTotalRevenue,
} from "../controllers/transactionController";
import { admin, protect } from "../middlewares/authMiddleware";

const router = express.Router();

// Route to create a new transaction
router.post("/", protect, admin, createTransaction);

// Route to get total revenue
router.get("/total", protect, admin, getTotalRevenue);

// Route to get all transactions
router.get("/", protect, admin, getTransactions);

// Route to get a single transaction by ID
router.get("/:id", protect, getTransactionById);

// Route to update a transaction status
router.put("/:id", protect, admin, updateTransactionStatus);

// Route to delete a transaction
router.delete("/:id", protect, admin, deleteTransaction);

export default router;
