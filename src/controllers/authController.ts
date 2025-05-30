import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, username } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400).json({ message: "Email in use" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    email,
    password: hashedPassword,
    username,
  });

  res.status(201).json({ message: `"User ${newUser.username} created"` });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  if (!JWT_SECRET) {
    res.status(500).json({ message: "JWT secret not set" });
    return;
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: "1d",
  });
  res.json({ token });
};
