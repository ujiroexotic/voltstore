import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Payment from "../models/payment";

// Create a new transaction
export const createTransaction = async (req: Request, res: Response) => {
  const { amount, user, paymentMethod } = req.body;

  // Validation can be added here
  if (!amount || !user || !paymentMethod) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const transaction = new Payment({
    amount,
    user,
    paymentMethod,
    status: "pending", // Default status for a new transaction
  });

  await transaction.save();

  res
    .status(201)
    .json({ message: "Transaction created successfully", transaction });
};

// Get all transactions
export const getTransactions = asyncHandler(
  async (req: Request, res: Response) => {
    const transactions = await Payment.find().sort({ createdAt: -1 });
    res.status(200).json({ transactions });
  }
);

//Get Total Revenue
export const getTotalRevenue = async (req: Request, res: Response) => {
  let totalRevenue = 0;
  try {
    const transactions = await Payment.find({ status: "paid" });
    totalRevenue = transactions.reduce((sum, trx) => sum + trx.amount, 0);
    res.status(200).json(totalRevenue);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while calculating total revenue." });
  }
};
// Get a single transaction by ID
export const getTransactionById = async (req: Request, res: Response) => {
  const transaction = await Payment.findById(req.params.id);

  if (!transaction) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  res.status(200).json({ transaction });
};

// Update transaction status
export const updateTransactionStatus = async (req: Request, res: Response) => {
  const { status } = req.body;
  const transaction = await Payment.findById(req.params.id);

  if (!transaction) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  transaction.status = status;
  await transaction.save();

  res.status(200).json({ message: "Transaction status updated", transaction });
};

export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = await Payment.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Using `deleteOne`
    await Payment.deleteOne({ _id: req.params.id });

    res.status(200).json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
