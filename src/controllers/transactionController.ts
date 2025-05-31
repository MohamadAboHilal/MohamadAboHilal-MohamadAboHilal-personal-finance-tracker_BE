import Transaction from "../models/Transaction";
import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../types/reqBody";
import dotenv from "dotenv";

dotenv.config();

export const createTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, amount, date, description, category } = req.body;
    const newTransaction = await Transaction.create({
      userId,
      amount,
      date,
      description,
      category,
    });
    res.status(201).json(newTransaction);
  } catch (error) {
    next(error);
  }
};

export const getTransactions = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.reqBody as string;
    const transactions = await Transaction.find({ userId }).sort({
      date: -1,
    });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions", error });
  }
};

export const deleteTransaction = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    if (!deletedTransaction) {
      res.status(404).json({ message: "Transaction not found" });
      return;
    }
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateTransaction = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedTransaction) {
      res.status(404).json({ message: "Transaction not found" });
      return;
    }
    res.status(200).json(updatedTransaction);
  } catch (error) {
    next(error);
  }
};
