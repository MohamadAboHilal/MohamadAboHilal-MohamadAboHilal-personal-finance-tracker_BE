import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/authRoute";
import transactionRouter from "./routes/transactionRoute";
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI!, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome to the Personal Finance Tracker API");
});

app.use(express.json());
app.use("/auth", authRouter);
app.use("/transactions", transactionRouter);

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
