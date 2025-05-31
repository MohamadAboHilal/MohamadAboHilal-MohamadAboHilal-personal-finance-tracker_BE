import {
  createTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
} from "../controllers/transactionController";
import express from "express";
import { authenticate } from "../middlewares/authMiddleware";

const transactionRouter = express.Router();

// Route to create a new transaction
transactionRouter.post("/createTransaction", authenticate, createTransaction);

transactionRouter.get("/getTransactions", authenticate, getTransactions);

transactionRouter.delete(
  "/deleteTransaction/:id",
  authenticate,
  deleteTransaction
);

transactionRouter.put(
  "/updateTransaction/:id",
  authenticate,
  updateTransaction
);

export default transactionRouter;
